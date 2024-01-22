package com.kl1verse.UserServer.domain.user.service;

import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.user.dto.res.MypageResponseDto;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MypageServiceImpl {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public MypageResponseDto getUserInfo(HttpServletRequest request) {
        /*
         * accessToken으로 유저 정보를 가져온다.
         */
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

//        String email = "admin";
//        String domain = "kakao";

        User user = userRepository.findByEmailAndDomain(email, domain).orElseThrow();

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
}