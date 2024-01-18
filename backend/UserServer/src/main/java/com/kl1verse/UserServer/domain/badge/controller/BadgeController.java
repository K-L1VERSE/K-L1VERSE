package com.kl1verse.UserServer.domain.badge.controller;

import com.kl1verse.UserServer.domain.badge.service.BadgeService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/badge")
@RequiredArgsConstructor
public class BadgeController {

    private final BadgeService badgeService;

    public ResponseEntity<List<Integer>> selectBadgeList(HttpServletRequest request) {
        return ResponseEntity.ok().body(badgeService.getBadges(request));
    }
}
