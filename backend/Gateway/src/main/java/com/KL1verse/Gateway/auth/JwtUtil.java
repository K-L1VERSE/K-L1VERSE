package com.KL1verse.Gateway.auth;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
public class JwtUtil {

    private static final String secretKey = "413F4428472B4B6250655368566D5970337336763979244226452948404D6351";

    // accessToken validate
    public static boolean isValidAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            log.info("Access Token Validated");
            return true;
        } catch (ExpiredJwtException expiredJwtException) {
            log.info("Access Token Expired");
            return true;
        } catch (Exception e) {
            log.info("Access Token Invalid");
            return false;
        }
    }
}
