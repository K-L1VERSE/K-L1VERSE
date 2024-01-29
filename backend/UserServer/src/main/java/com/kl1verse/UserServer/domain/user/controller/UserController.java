package com.kl1verse.UserServer.domain.user.controller;


import com.kl1verse.UserServer.domain.auth.service.AuthService;
import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.auth.dto.res.ReIssueResDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import com.kl1verse.UserServer.domain.notification.dto.res.NotificationResDto;
import com.kl1verse.UserServer.domain.notification.service.NotificationService;
import com.kl1verse.UserServer.domain.user.dto.res.MypageResponseDto;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.domain.user.service.MypageServiceImpl;
import com.kl1verse.UserServer.global.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final MypageServiceImpl mypageService;
    private final AuthService authService;
    
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final StringRedisTemplate redisTemplate;
    private final NotificationService notificationService;

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

    @GetMapping
    public ResponseEntity<?> logout(HttpServletRequest request) {
        authService.signOut(request);

        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/access_token/reissue")
    public ResponseEntity<?> accessTokenReIssue(HttpServletRequest request) {
        log.info("access token reissue");

        String requestToken = jwtUtil.resolveToken(request);

        // accessToken 만료
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);
        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(() -> new UserException(
            ResponseCode.INVALID_USER_INFO));

        String refreshToken = redisTemplate.opsForValue().get(user.getEmail()+":"+user.getDomain());

        // Refresh Token 만료 된 상황
        if(refreshToken == null) {
            log.info("Refresh Token Expired");
//            Custom Error 1101 return
//            throw new TokenException(ResponseCode.EXPIRED_REFRESH_TOKEN);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Refresh Token 만료 안된 상황
        else {
            log.info("Access Token Expired & Refresh Token Validated");
            Authentication authentication = jwtUtil.getAuthentication(refreshToken);

            // accessToken 재발급
            String accessToken = jwtUtil.createAccessToken(authentication, domain);
            return ResponseEntity.ok().body(new ReIssueResDto(accessToken));
        }
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationResDto>> selectUserNotifications(HttpServletRequest request) {
        log.info("select user notifications");
        return ResponseEntity.ok(notificationService.getNotifications(request));
    }

    @GetMapping("notifications/read")
    public ResponseEntity<?> readUserNotifications(HttpServletRequest request) {
        notificationService.readNotifications(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/notifications/test")
    public ResponseEntity<String> notificationTest() {
        notificationService.sendNotification(MessageReqDto.builder()
            .userId(1)
            .type(NotificationType.GOAL)
            .message("테스트 알림 입니다.")
            .uri("http://localhost:3000/mypage")
            .date(LocalDateTime.now())
            .build());
        return ResponseEntity.ok("OK");
    }

}
