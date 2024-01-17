package com.kl1verse.UserServer.domain.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.kl1verse.UserServer.domain.auth.dto.res.ReIssueResDto;
import com.kl1verse.UserServer.domain.auth.exception.TokenException;
import com.kl1verse.UserServer.domain.auth.repository.TokenRepository;
import com.kl1verse.UserServer.domain.auth.repository.entity.Token;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        String requestToken = jwtUtil.resolveToken(request);

        if (requestToken == null) {
            filterChain.doFilter(request, response);
        } else if (requestToken != null && jwtUtil.isValidAccessToken(requestToken)) { // accessToken 정상
            Authentication authentication = jwtUtil.getAuthentication(requestToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        } else {
            // accessToken 만료
            String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
            User user = userRepository.findByEmail(email).orElseThrow(() -> new UserException(
                ResponseCode.INVALID_USER_INFO));
            Token token = tokenRepository.findByUserId(user.getId()).orElseThrow(() -> new UserException(
                ResponseCode.INVALID_USER_INFO));

            String refreshToken = token.getRefreshToken();

            try {
                // refreshToken 정상
                Authentication authentication = jwtUtil.getAuthentication(refreshToken);
                String accessToken = jwtUtil.createAccessToken(authentication); // accessToken 재발급
                ObjectNode json = new ObjectMapper().createObjectNode();
                json.put("code", ResponseCode.EXPIRED_ACCESS_TOKEN.getCode());
                json.put("message", String.valueOf(ResponseCode.EXPIRED_ACCESS_TOKEN.getMessage()));
                json.put("data", new ReIssueResDto(accessToken).toJson());
                String newResponse = new ObjectMapper().writeValueAsString(json);
                response.setContentLength(newResponse.length());
                response.getOutputStream().write(newResponse.getBytes());
            } catch (ExpiredJwtException expiredJwtException) {
                // refreshToken 만료
//                user.setToken(null);
//                userRepository.save(user);
                tokenRepository.deleteById(token.getId());
                ObjectNode json = new ObjectMapper().createObjectNode();
                json.put("code", ResponseCode.EXPIRED_REFRESH_TOKEN.getCode());
                json.put("message", String.valueOf(ResponseCode.EXPIRED_REFRESH_TOKEN.getMessage()));
                String newResponse = new ObjectMapper().writeValueAsString(json);
                response.setContentLength(newResponse.length());
                response.getOutputStream().write(newResponse.getBytes());
            }
        }
    }
}
