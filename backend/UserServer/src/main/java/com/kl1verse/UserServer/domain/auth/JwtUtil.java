package com.kl1verse.UserServer.domain.auth;

import com.kl1verse.UserServer.domain.auth.exception.TokenException;
import com.kl1verse.UserServer.domain.auth.repository.TokenRepository;
import com.kl1verse.UserServer.domain.auth.repository.entity.Token;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.domain.user.service.UserDetailServiceImpl;
import com.kl1verse.UserServer.global.ResponseCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final String secretKey = "413F4428472B4B6250655368566D5970337336763979244226452948404D6351";
    private final Long accessExpirationTime = Duration.ofMinutes(60).toMillis(); // 60분
    private final Long refreshExpirationTime = Duration.ofHours(24).toMillis();  // 24시간

    private final UserDetailServiceImpl userDetailService;

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    // accessToken 생성
    public String createAccessToken(Authentication authentication) {
        log.info("createAccessToken()");
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + accessExpirationTime);
        String accessToken;
        accessToken = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(expireDate)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
        return accessToken;
    }

    // refreshToken 생성
    public void createRefreshToken(Authentication authentication, User user) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + refreshExpirationTime);
        String refreshToken;
        refreshToken = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(expireDate)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();

        // DB에 저장
        Token token = Token.builder()
            .refreshToken(refreshToken)
            .build();
        tokenRepository.save(token);

//        user.setToken(token);
        userRepository.save(user);
    }

    public Authentication getAuthentication(String token) {
        String claims = Jwts
            .parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
        UserDetails userDetails = userDetailService.loadUserByUsername(claims);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // http 헤더로부터 bearer token을 추출
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // accessToken validate
    public boolean isValidAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException expiredJwtException) {
            return false;
        }
    }

    // accessToken 재발급
    public String reIssueAccessToken(String email) {
        // email로 refreshToken 조회
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserException(
            ResponseCode.INVALID_USER_INFO));
        Token token = tokenRepository.findByUserId(user.getId()).orElseThrow(() -> new UserException(
            ResponseCode.INVALID_USER_INFO));
        String refreshToken = token.getRefreshToken();

        try {
            // refreshToken이 정상일때
            Authentication authentication = getAuthentication(refreshToken);
            String accessToken;
            accessToken = createAccessToken(authentication);
            return accessToken;
        } catch (JwtException jwtException) {
//            //refreshToken이 만료일때
//            UUID user_token_id = user.getToken().getId();
//            user.setToken(null);
//            userRepository.save(user);
            tokenRepository.deleteById(token.getId());
            throw new TokenException(ResponseCode.EXPIRED_REFRESH_TOKEN);
        }
    }

    // extract userName from expired accessToken
    public String extractUserNameFromExpiredToken (String token) {
        String[] arr = token.split("\\.");
        byte[] decodedBytes = Base64.getDecoder().decode(arr[1]);

        JSONParser parser = new JSONParser();
        JSONObject payload = null;
        try {
            payload = (JSONObject) parser.parse(new String(decodedBytes));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return (String) payload.get("sub");
    }
}
