package com.kl1verse.UserServer.domain.user.controller;


import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.auth.dto.res.ReIssueResDto;
import com.kl1verse.UserServer.domain.auth.dto.res.SignInResDto;
import com.kl1verse.UserServer.domain.auth.exception.TokenException;
import com.kl1verse.UserServer.domain.auth.repository.TokenRepository;
import com.kl1verse.UserServer.domain.auth.repository.entity.Token;
import com.kl1verse.UserServer.domain.user.dto.res.MypageResponseDto;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.domain.user.service.MypageServiceImpl;
import com.kl1verse.UserServer.global.ResponseCode;
import com.kl1verse.UserServer.global.dto.BaseResponse;
import com.kl1verse.UserServer.global.exception.BaseException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final MypageServiceImpl mypageService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @GetMapping("/hello")
    public String hello() {
        log.info(("Hello World!"));
        return "Hello World!";
    }

    @GetMapping("/mypage")
    public ResponseEntity<MypageResponseDto> userinfo(HttpServletRequest request) {
        log.info("user info");
        return ResponseEntity.ok(mypageService.getUserInfo(request));
    }

    @GetMapping("/access_token/reissue")
    public ResponseEntity<?> accessToken(HttpServletRequest request) {
        log.info("access token reissue");

        String requestToken = jwtUtil.resolveToken(request);

        // accessToken 만료
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);
        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(() -> new UserException(
            ResponseCode.INVALID_USER_INFO));
        Token token = tokenRepository.findByUserId(user.getId()).orElseThrow(() -> new UserException(
            ResponseCode.INVALID_USER_INFO));

        String refreshToken = token.getRefreshToken();

        try {
            Authentication authentication = jwtUtil.getAuthentication(refreshToken);

            // refreshToken 정상
            log.info("Access Token Expired & Refresh Token Validated");
            String accessToken = jwtUtil.createAccessToken(authentication, domain); // accessToken 재발급
            return ResponseEntity.ok().body(new ReIssueResDto(accessToken));
            } catch (ExpiredJwtException expiredJwtException) {
            // refreshToken 만료
            log.info("Refresh Token Expired");
//            Custom Error 1101 return
//            throw new TokenException(ResponseCode.EXPIRED_REFRESH_TOKEN);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
