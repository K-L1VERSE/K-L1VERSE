package com.kl1verse.UserServer.domain.user.controller;


import com.kl1verse.UserServer.domain.auth.service.AuthService;
import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.auth.dto.res.ReIssueResDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import com.kl1verse.UserServer.domain.notification.dto.res.NotificationResDto;
import com.kl1verse.UserServer.domain.notification.service.NotificationService;
import com.kl1verse.UserServer.domain.user.dto.res.CheckGoalResDto;
import com.kl1verse.UserServer.domain.user.dto.res.MypageResponseDto;
import com.kl1verse.UserServer.domain.user.dto.res.NicknameUpdateReqDto;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.domain.user.service.MypageServiceImpl;
import com.kl1verse.UserServer.domain.user.service.UserService;
import com.kl1verse.UserServer.global.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    private final UserService userService;

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
            return ResponseEntity.ok().build();
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

    @DeleteMapping("/notifications")
    public ResponseEntity<?> deleteNotification(@RequestBody Map<String, Integer> map) {
        notificationService.deleteNotification(map.get("notificationId"));
        return ResponseEntity.ok().build();
    }

    @PutMapping("/notifications/flag")
    public ResponseEntity<?> updateNotificationFlag(HttpServletRequest request) {
        notificationService.updateNotificationFlag(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/notifications/test/goal")
    public ResponseEntity<String> notificationTestGoal() {
        notificationService.sendNotification(MessageReqDto.builder()
                .userId(1)
                .type(NotificationType.GOAL)
                .message("골) 테스트 알림 입니다.")
                .uri("/mypage")
                .date(LocalDateTime.now())
                .build());
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/notifications/test/comment")
    public ResponseEntity<String> notificationTestComment() {
        notificationService.sendNotification(MessageReqDto.builder()
                .userId(1)
                .type(NotificationType.COMMENT)
                .profile("https://ssl.pstatic.net/static/pwe/address/img_profile.png")
                .nickname("홍윤기")
                .message("님이 댓글을 달았습니다.")
                .uri("/waggle/1")
                .date(LocalDateTime.now())
                .build());
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/notifications/test/like")
    public ResponseEntity<String> notificationTestLike() {
        notificationService.sendNotification(MessageReqDto.builder()
                .userId(1)
                .type(NotificationType.LIKE)
                .profile("https://ssl.pstatic.net/static/pwe/address/img_profile.png")
                .nickname("홍윤기")
                .message("님이 좋아요를 누르셨습니다.")
                .uri("/waggle/1")
                .date(LocalDateTime.now())
                .build());
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/notifications/test/match")
    public ResponseEntity<String> notificationTestMatch() {
        notificationService.sendNotification(MessageReqDto.builder()
                .userId(1)
                .type(NotificationType.MATCH)
                .homeTeamId("1")
                .awayTeamId("2")
                .message("경기 시작 30분전 입니다.")
                .uri("/matchDetail/201")
                .date(LocalDateTime.now())
                .build());
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/notifications/test/news")
    public ResponseEntity<String> notificationTestNews() {
        notificationService.sendNotification(MessageReqDto.builder()
                .userId(1)
                .type(NotificationType.NEWS)
                .message("뉴스) 테스트 알림 입니다.")
                .uri("https://sports.news.naver.com/news?oid=109&aid=0005014723")
                .date(LocalDateTime.now())
                .build());
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/profile")
    public ResponseEntity<?> updateProfile(HttpServletRequest request, @RequestBody Map<String, String> map) {
        mypageService.updateProfile(request, map.get("profile"));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/check-nickname")
    public ResponseEntity<?> checkNicknameAvailable(HttpServletRequest request, @RequestBody Map<String, String> map) {
        return ResponseEntity.ok().body(mypageService.checkNicknameAvailable(request, map.get("nickname")));
    }

    @PostMapping("/nickname")
    public ResponseEntity<?> insertNickname(HttpServletRequest request, @RequestBody NicknameUpdateReqDto nicknameUpdateReqDto) {
        mypageService.setNickname(request, nicknameUpdateReqDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/nickname")
    public ResponseEntity<?> updateNickname(HttpServletRequest request, @RequestBody NicknameUpdateReqDto nicknameUpdateReqDto) {
        mypageService.updateNickname(request, nicknameUpdateReqDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/badgeTest/{badgeDetailId}")
    public ResponseEntity<?> badgeTest(@PathVariable(name = "badgeDetailId") String badgeDetailId) {
            List<User> userList = userRepository.findByBadgeDetailId(badgeDetailId);
        return ResponseEntity.ok().body(userList);
    }

    @PostMapping("/goal")
    public ResponseEntity<?> checkGoal(@RequestBody CheckGoalResDto checkGoalResDto) {
        return ResponseEntity.ok().body(userService.checkGoal(checkGoalResDto));
    }
}
