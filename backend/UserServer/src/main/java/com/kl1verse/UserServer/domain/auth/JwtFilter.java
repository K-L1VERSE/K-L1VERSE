//package com.kl1verse.UserServer.domain.auth;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.node.ObjectNode;
//import com.kl1verse.UserServer.domain.auth.dto.res.ReIssueResDto;
//import com.kl1verse.UserServer.domain.auth.exception.TokenException;
//import com.kl1verse.UserServer.domain.auth.repository.TokenRepository;
//import com.kl1verse.UserServer.domain.auth.repository.entity.Token;
//import com.kl1verse.UserServer.domain.user.exception.UserException;
//import com.kl1verse.UserServer.domain.user.repository.UserRepository;
//import com.kl1verse.UserServer.domain.user.repository.entity.User;
//import com.kl1verse.UserServer.global.ResponseCode;
//import io.jsonwebtoken.ExpiredJwtException;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//@Slf4j
//@RequiredArgsConstructor
//public class JwtFilter extends OncePerRequestFilter {
//
//    private final JwtUtil jwtUtil;
//    private final UserRepository userRepository;
//    private final TokenRepository tokenRepository;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//        HttpServletResponse response,
//        FilterChain filterChain) throws ServletException, IOException {
//        String requestToken = jwtUtil.resolveToken(request);
//
//        if (requestToken == null) {
//            log.info("Access Token is null from Request");
//            filterChain.doFilter(request, response);
//        } else if (requestToken != null && jwtUtil.isValidAccessToken(requestToken)) { // accessToken 정상
//            log.info("Access Token Validated");
//            Authentication authentication = jwtUtil.getAuthentication(requestToken);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            filterChain.doFilter(request, response);
//        } else {
//            // accessToken 만료
//            String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
//            String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);
//            User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(() -> new UserException(
//                ResponseCode.INVALID_USER_INFO));
//            Token token = tokenRepository.findByUserId(user.getId()).orElseThrow(() -> new UserException(
//                ResponseCode.INVALID_USER_INFO));
//
//            String refreshToken = token.getRefreshToken();
//
//            try {
//                Authentication authentication = jwtUtil.getAuthentication(refreshToken);
//
//                // refreshToken 정상
//                log.info("Access Token Expired & Refresh Token Validated");
//                String accessToken = jwtUtil.createAccessToken(authentication, domain); // accessToken 재발급
//                ObjectNode json = new ObjectMapper().createObjectNode();
//                json.put("code", ResponseCode.EXPIRED_ACCESS_TOKEN.getCode());
//                json.put("message", String.valueOf(ResponseCode.EXPIRED_ACCESS_TOKEN.getMessage()));
//                json.put("data", new ReIssueResDto(accessToken).toJson());
//                String newResponse = new ObjectMapper().writeValueAsString(json);
//                response.setContentLength(newResponse.getBytes(StandardCharsets.UTF_8).length);
//                response.getOutputStream().write(newResponse.getBytes(StandardCharsets.UTF_8));
//            } catch (ExpiredJwtException expiredJwtException) {
//                // refreshToken 만료
//                log.info("Refresh Token Expired");
//                ObjectNode json = new ObjectMapper().createObjectNode();
//                json.put("code", ResponseCode.EXPIRED_REFRESH_TOKEN.getCode());
//                json.put("message", String.valueOf(ResponseCode.EXPIRED_REFRESH_TOKEN.getMessage()));
//                String newResponse = new ObjectMapper().writeValueAsString(json);
//                response.setContentLength(newResponse.getBytes(StandardCharsets.UTF_8).length);
//                response.getOutputStream().write(newResponse.getBytes(StandardCharsets.UTF_8));
//            }
//        }
//    }
//}
