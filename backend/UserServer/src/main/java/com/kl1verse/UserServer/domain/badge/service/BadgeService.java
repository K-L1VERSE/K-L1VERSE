package com.kl1verse.UserServer.domain.badge.service;

import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.badge.repository.BadgeRepository;
import com.kl1verse.UserServer.domain.badge.repository.entity.Badge;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.global.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BadgeService {

    private final JwtUtil jwtUtil;
    private final BadgeRepository badgeRepository;
    private final UserRepository userRepository;

    public List<Integer> getBadges(HttpServletRequest request) {
        /*
        * accessToken으로 유저 정보를 가져온다.
        */
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

        /*
        * 유저 정보로 뱃지 정보를 가져온다.
        */
        Long userId = userRepository.findByEmailAndDomain(email, domain)
            .orElseThrow(() -> new UserException(ResponseCode.INVALID_USER_INFO)).getId();

        List<Badge> badges = badgeRepository.findByUserId(userId);
        return badges.stream().map(Badge::getCode).collect(Collectors.toList());
    }
}
