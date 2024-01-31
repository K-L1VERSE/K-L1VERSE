package com.kl1verse.UserServer.domain.user.service;

import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.s3.repository.entity.File;
import com.kl1verse.UserServer.domain.s3.service.FileService;
import com.kl1verse.UserServer.domain.s3.service.UserImageService;
import com.kl1verse.UserServer.domain.user.dto.res.MypageResponseDto;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MypageServiceImpl {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final UserImageService userImageService;
    private final FileService fileService;

    public MypageResponseDto getUserInfo(HttpServletRequest request) {
        /*
         * accessToken으로 유저 정보를 가져온다.
         */
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

//        String email = "admin";
//        String domain = "kakao";

        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(
            () -> new UserException(ResponseCode.INVALID_USER_INFO));

        /* accurate 계산 */
        float accurate;
        if (user.getTotalBet() == 0) {
            accurate = 0.0f;
        } else {
            accurate = (float) ((float) user.getWinBet() / user.getTotalBet() * 100.0);
        }

        return MypageResponseDto.builder()
            .userId(user.getId())
            .nickname(user.getNickname())
            .profile(user.getProfile())
            .mainBadge(user.getMainBadge())
            .goal(user.getGoal())
            .accurate(accurate)
            .totalBet(user.getTotalBet())
            .winBet(user.getWinBet())
            .build();
    }

    @Transactional
    public void updateProfile(HttpServletRequest request, String profile) {
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow(
            () -> new UserException(ResponseCode.INVALID_USER_INFO));

        user.setProfile(profile);
        userRepository.save(user);

        File file = fileService.saveFile(profile);
        userImageService.saveUserImage(user, file);
    }
}