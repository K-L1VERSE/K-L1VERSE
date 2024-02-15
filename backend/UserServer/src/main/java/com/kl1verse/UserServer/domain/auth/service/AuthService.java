package com.kl1verse.UserServer.domain.auth.service;

import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.auth.dto.req.SignInReqDto;
import com.kl1verse.UserServer.domain.auth.dto.req.SignUpReqDto;
import com.kl1verse.UserServer.domain.auth.dto.res.SignInResDto;
import com.kl1verse.UserServer.domain.auth.exception.TokenException;
import com.kl1verse.UserServer.domain.auth.repository.TokenRepository;
import com.kl1verse.UserServer.domain.auth.repository.entity.Token;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import com.kl1verse.UserServer.domain.notification.service.NotificationService;
import com.kl1verse.UserServer.domain.s3.repository.FileRepository;
import com.kl1verse.UserServer.domain.s3.repository.UserImageRepository;
import com.kl1verse.UserServer.domain.s3.repository.entity.File;
import com.kl1verse.UserServer.domain.s3.repository.entity.UserImage;
import com.kl1verse.UserServer.domain.s3.service.FileService;
import com.kl1verse.UserServer.domain.s3.service.UserImageService;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final StringRedisTemplate redisTemplate;
    private final NotificationService notificationService;
    private final UserImageService userImageService;
    private final FileService fileService;

    @Value("${domain}")
    private String domain;

    // 회원 가입 여부 확인
    public boolean isExistUser(String email, String domain) {
        return userRepository.findByEmailAndDomain(email, domain).isPresent();
    }

    // 회원가입
    @Transactional
    public void signUp(SignUpReqDto signUpReqDto) {

        log.info("new User SignUp = {} / {}", signUpReqDto.getEmail(), signUpReqDto.getDomain());

        boolean exsitUser = userRepository.findByEmailAndDomain(signUpReqDto.getEmail(),
            signUpReqDto.getDomain()).isPresent();
        if (exsitUser) {
            throw new UserException(ResponseCode.USER_ALREADY_EXIST_ERROR);
        }

        User user = User.builder()
            .email(signUpReqDto.getEmail())
            .password(passwordEncoder.encode("1234"))
            .profile(signUpReqDto.getProfile())
            .domain(signUpReqDto.getDomain())
            .goal(2500)
            .totalBet(0)
            .winBet(0)
            .notificationFlag(true)
            .build();
        userRepository.save(user);

        File file = fileService.saveFile(signUpReqDto.getProfile());
        userImageService.saveUserImage(user, file);
    }

    // 로그인
    @Transactional
    public SignInResDto signIn(SignInReqDto signInDto) {
        User user = userRepository.findByEmailAndDomain(signInDto.getEmail(), signInDto.getDomain())
            .orElseThrow(() -> new UserException(ResponseCode.INVALID_USER_INFO));

        /*
        * 유저가 오늘 로그인 했는지 확인
        */
        String todayLogin = (String) redisTemplate.opsForValue().get(user.getEmail()+":"+user.getDomain()+"/goal");
        if (todayLogin == null) {
            /*
            * 로그인 한적 없음
            * 자정까지의 시간으로 설정하여 Redis에 저장 후 골 지급
            */
            LocalDateTime midnight = LocalDateTime.now().toLocalDate().atTime(LocalTime.MAX);
            long secondsUntilMidnight = LocalDateTime.now().until(midnight, ChronoUnit.SECONDS);
            redisTemplate.opsForValue().set(user.getEmail()+":"+user.getDomain()+"/goal", LocalDateTime.now().toString(), Duration.ofSeconds(secondsUntilMidnight));

            // 100골 지급 (Todo... 골 지급 정책 정하기)
            log.info("user {}:{} today first login at {}", user.getEmail(), user.getDomain(), LocalDateTime.now());
            user.setGoal(user.getGoal() + 10);
            notificationService.sendNotification(MessageReqDto.builder()
                        .userId(user.getId())
                        .type(NotificationType.GOAL)
                        .message("출석 보상으로 10골을 지급 받았습니다.")
                        .uri("/mypage")
                        .date(LocalDateTime.now())
                        .build());
        } else {
            log.info("user {}:{} already login today at {}", user.getEmail(), user.getDomain(), todayLogin);
        }

        // accessToken 생성
        Authentication authentication = null;
        authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(signInDto.getEmail()+":"+signInDto.getDomain(), "1234")
        );
        String accessToken = jwtUtil.createAccessToken(authentication, signInDto.getDomain());

        // refreshToken 생성
        jwtUtil.createRefreshToken(authentication, user);

        SignInResDto signInResDto = SignInResDto.builder()
            .email(user.getEmail())
            .accessToken(accessToken)
            .nickname(user.getNickname())
            .profile(user.getProfile())
            .domain(user.getDomain())
            .userId(user.getId())
            .notificationFlag(user.getNotificationFlag())
            .build();

        if(user.getWearBadge() != null) {
            signInResDto.setMainBadge(user.getWearBadge().getBadgeDetail().getCode());
        }
        return signInResDto;
    }

    // 로그아웃
    @Transactional
    public void signOut(HttpServletRequest request) {
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);
        log.info("signOut = {} / {}", email, domain);

        User user = userRepository.findByEmailAndDomain(email, domain)
            .orElseThrow(() -> new UserException(
                ResponseCode.INVALID_USER_INFO));
        redisTemplate.delete(user.getEmail()+":"+user.getDomain());
    }
}
