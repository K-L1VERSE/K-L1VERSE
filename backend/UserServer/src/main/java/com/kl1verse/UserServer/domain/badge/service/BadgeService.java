package com.kl1verse.UserServer.domain.badge.service;

import com.kl1verse.UserServer.domain.auth.JwtUtil;
import com.kl1verse.UserServer.domain.badge.dto.req.BadgeBuyReqDto;
import com.kl1verse.UserServer.domain.badge.dto.req.BadgeDetailReqDto;
import com.kl1verse.UserServer.domain.badge.repository.BadgeDetailRepository;
import com.kl1verse.UserServer.domain.badge.repository.BadgeRepository;
import com.kl1verse.UserServer.domain.badge.repository.entity.Badge;
import com.kl1verse.UserServer.domain.badge.repository.entity.BadgeDetail;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BadgeService {

    private final JwtUtil jwtUtil;
    private final BadgeRepository badgeRepository;
    private final BadgeDetailRepository badgeDetailRepository;
    private final UserRepository userRepository;

    public List<String> getBadges(HttpServletRequest request) {
        /*
        * accessToken으로 유저 정보를 가져온다.
        */
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

        /*
        * 유저 정보로 뱃지 정보를 가져온다.
        */
        Integer userId = userRepository.findByEmailAndDomain(email, domain)
            .orElseThrow(() -> new UserException(ResponseCode.INVALID_USER_INFO)).getId();

        List<Badge> badges = badgeRepository.findByUserId(userId);
        return badges.stream().map(badge -> badge.getBadgeDetail().getCode()).collect(Collectors.toList());
    }

    @Transactional
    public void buyBadge(HttpServletRequest request, BadgeBuyReqDto badgeBuyReqDto) {
        /*
        * accessToken으로 유저 정보를 가져온다.
        */
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

        /*
        * 유저 정보로 뱃지 정보를 가져온다.
        */
        User user = userRepository.findByEmailAndDomain(email, domain)
            .orElseThrow(() -> new UserException(ResponseCode.INVALID_USER_INFO));

        /*
        * 이미 구매한 뱃지인 경우
        */
        badgeRepository.findByUserId(user.getId()).stream()
            .filter(badge -> badge.getBadgeDetail().getCode().equals(badgeBuyReqDto.getCode()))
            .findFirst()
            .ifPresent(badge -> {
                throw new UserException(ResponseCode.ALREADY_BUYED_BADGE);
            });

        BadgeDetail badgeDetail = badgeDetailRepository.findByCode(badgeBuyReqDto.getCode())
            .orElseThrow(() -> new UserException(ResponseCode.BADGE_NOT_FOUND));

        if(user.getGoal() < badgeDetail.getPrice()) {
            throw new UserException(ResponseCode.NOT_ENOUGH_GOAL);
        }

        user.setGoal(user.getGoal() - badgeDetail.getPrice());
        userRepository.save(user);
        log.info("user {} buy badge {} at {} ", user.getEmail(), badgeDetail.getCode(), LocalDateTime.now());

        Badge badge = Badge.builder()
            .user(user)
            .badgeDetail(badgeDetail)
            .buyAt(LocalDateTime.now())
            .build();
        badgeRepository.save(badge);
    }

    @Transactional
    public void wearBadge(HttpServletRequest request, BadgeBuyReqDto badgeBuyReqDto) {
        /*
        * accessToken으로 유저 정보를 가져온다.
        */
        String requestToken = jwtUtil.resolveToken(request);
        String email = jwtUtil.extractUserNameFromExpiredToken(requestToken);
        String domain = jwtUtil.extractUserDomainFromExpiredToken(requestToken);

        /*
        * 유저 정보로 뱃지 정보를 가져온다.
        */
        User user = userRepository.findByEmailAndDomain(email, domain)
            .orElseThrow(() -> new UserException(ResponseCode.INVALID_USER_INFO));

        if(user.getWearBadge() != null) {
            log.info("user {} put off badge {}", user.getEmail(), user.getWearBadge().getBadgeDetail().getCode());
            user.setWearBadge(null);
        }

        Optional<Badge> userBadge = badgeRepository.findByUserId(user.getId()).stream()
            .filter(badge -> badge.getBadgeDetail().getCode().equals(badgeBuyReqDto.getCode()))
            .findFirst();

        if(userBadge.isEmpty()) {
            throw new UserException(ResponseCode.DO_NOT_HAVE_BADGE);
        } else {
            user.setWearBadge(userBadge.get());
        }


        userRepository.save(user);

        log.info("user {} wear badge {}", user.getEmail(), user.getWearBadge().getBadgeDetail().getCode());
    }

    @Transactional
    public void addBadgeDetail(BadgeDetailReqDto badgeDetailReqDto) {
        BadgeDetail badgeDetail = BadgeDetail.builder()
            .code(badgeDetailReqDto.getCode())
            .description(badgeDetailReqDto.getDescription())
            .price(badgeDetailReqDto.getPrice())
            .build();
        badgeDetailRepository.save(badgeDetail);
    }
}
