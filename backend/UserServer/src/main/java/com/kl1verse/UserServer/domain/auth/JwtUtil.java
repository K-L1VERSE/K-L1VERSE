package com.kl1verse.UserServer.domain.auth;

import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.domain.user.service.UserDetailServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;

import static com.kl1verse.UserServer.domain.user.service.UserDetailServiceImpl.CustomUserDetails;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperty jwtProperty;
    private final UserDetailServiceImpl userDetailService;
    private final StringRedisTemplate redisTemplate;

    // accessToken 생성
    public String createAccessToken(Authentication authentication, String domain) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        claims.put("domain", domain);

        Date now = new Date();
        Date expireDate = new Date(now.getTime() + jwtProperty.getAccessExpirationTime() * 1000);
        String accessToken = Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(expireDate)
            .signWith(SignatureAlgorithm.HS256, jwtProperty.getSecretKey())
            .compact();
        log.info("JWT accessToken = {}", accessToken);
        return accessToken;
    }

    // refreshToken 생성
    @Transactional
    public void createRefreshToken(Authentication authentication, User user) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        claims.put("domain", user.getDomain());
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + jwtProperty.getRefreshExpirationTime() * 1000);
        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, jwtProperty.getSecretKey())
                .compact();

        log.info("refreshToken = {}", refreshToken);
        redisTemplate.opsForValue().set(user.getEmail()+":"+user.getDomain(), refreshToken, Duration.ofSeconds(jwtProperty.getRefreshExpirationTime()));
    }

    public Authentication getAuthentication(String token) {
        String email = Jwts
            .parser()
            .setSigningKey(jwtProperty.getSecretKey())
            .parseClaimsJws(token)
            .getBody()
            .getSubject();

        String domain = Jwts
            .parser()
            .setSigningKey(jwtProperty.getSecretKey())
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
