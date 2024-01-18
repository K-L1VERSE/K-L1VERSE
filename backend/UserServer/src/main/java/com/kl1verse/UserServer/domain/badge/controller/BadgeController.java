package com.kl1verse.UserServer.domain.badge.controller;

import com.kl1verse.UserServer.domain.badge.dto.req.BadgeBuyReqDto;
import com.kl1verse.UserServer.domain.badge.dto.req.BadgeDetailReqDto;
import com.kl1verse.UserServer.domain.badge.service.BadgeService;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/badges")
@RequiredArgsConstructor
public class BadgeController {

    private final BadgeService badgeService;

    @GetMapping
    public ResponseEntity<List<String>> selectBadgeList(HttpServletRequest request) {
        return ResponseEntity.ok().body(badgeService.getBadges(request));
    }

    @PostMapping
    public ResponseEntity<?> buyBadge(HttpServletRequest request, @RequestBody BadgeBuyReqDto badgeBuyReqDto) {
        badgeService.buyBadge(request, badgeBuyReqDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/wear")
    public ResponseEntity<?> wearBadge(HttpServletRequest request, @RequestBody BadgeBuyReqDto badgeBuyReqDto) {
        badgeService.wearBadge(request, badgeBuyReqDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/detail")
    public ResponseEntity<?> insertBadgeDetail(@RequestBody BadgeDetailReqDto badgeDetailReqDto) {
        badgeService.addBadgeDetail(badgeDetailReqDto);
        return ResponseEntity.ok().build();
    }
}
