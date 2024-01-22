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
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import static com.kl1verse.UserServer.domain.user.service.UserDetailServiceImpl.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final String secretKey = "413F4428472B4B6250655368566D5970337336763979244226452948404D6351";
//    private final Long accessExpirationTime = Duration.ofMinutes(60).toMillis(); // 60분
//    private final Long refreshExpirationTime = Duration.ofHours(24).toMillis();  // 24시간
    private final Long accessExpirationTime = Duration.ofSeconds(10).toMillis(); // 10초
    private final Long refreshExpirationTime = Duration.ofSeconds(60).toMillis();  // 60초


    private final UserDetailServiceImpl userDetailService;

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    // accessToken 생성
    public String createAccessToken(Authentication authentication, String domain) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        claims.put("domain", domain);

        Date now = new Date();
        Date expireDate = new Date(now.getTime() + accessExpirationTime);
        String accessToken;
        accessToken = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(expireDate)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
        log.info("JWT accessToken = {}", accessToken);
        return accessToken;
    }

    // refreshToken 생성
    @Transactional
    public void createRefreshToken(Authentication authentication, User user) {
        Optional<Token> existingToken = tokenRepository.findByUserId(user.getId());

        if (existingToken.isPresent()) {
            // 이미 해당 User에 대한 Token이 존재하면 업데이트
            log.info("Already RefreshToken = {}", user.getEmail());
            Token tokenToUpdate = existingToken.get();
            updateToken(tokenToUpdate, authentication);
        } else {
            // 해당 User에 대한 Token이 없으면 새로 생성
            createNewToken(authentication, user);
        }
    }

    private void updateToken(Token token, Authentication authentication) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        claims.put("domain", token.getUser().getDomain());
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + refreshExpirationTime);
        String refreshToken = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(expireDate)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();

        token.setRefreshToken(refreshToken);
        log.info("refreshToken Updated = {}", refreshToken);
        tokenRepository.save(token);
    }

    private void createNewToken(Authentication authentication, User user) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        claims.put("domain", user.getDomain());
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + refreshExpirationTime);
        String refreshToken = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(expireDate)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();

        Token newToken = Token.builder()
            .refreshToken(refreshToken)
            .user(user)
            .build();
        log.info("refreshToken = {}", refreshToken);
        tokenRepository.save(newToken);
    }

    public Authentication getAuthentication(String token) {
        String email = Jwts
            .parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();

        String domain = Jwts
            .parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .getBody()
            .get("domain", String.class);

        CustomUserDetails customUserDetails = (CustomUserDetails) userDetailService.loadUserByUsername(email+":"+domain);
        return new UsernamePasswordAuthenticationToken(customUserDetails, "", customUserDetails.getAuthorities());
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
    public String reIssueAccessToken(String email, String domain) {
        // email로 refreshToken 조회
        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(() -> new UserException(
            ResponseCode.INVALID_USER_INFO));
        Token token = tokenRepository.findByUserId(user.getId()).orElseThrow(() -> new UserException(
            ResponseCode.INVALID_USER_INFO));
        String refreshToken = token.getRefreshToken();

        try {
            // refreshToken이 정상일때
            Authentication authentication = getAuthentication(refreshToken);
            String accessToken;
            accessToken = createAccessToken(authentication, domain);
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
        String userName = (String) payload.get("sub");
        log.info("extracted UserName from AccessToken = {}", userName);
        return userName;
    }

    public String extractUserDomainFromExpiredToken (String token) {
        String[] arr = token.split("\\.");
        byte[] decodedBytes = Base64.getDecoder().decode(arr[1]);

        JSONParser parser = new JSONParser();
        JSONObject payload = null;
        try {
            payload = (JSONObject) parser.parse(new String(decodedBytes));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        String domain = (String) payload.get("domain");
        log.info("extracted UserDomain from AccessToken = {}", domain);
        return domain;
    }
}
