package com.KL1verse.match.match.controller;

import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.service.MatchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/matches")
@RequiredArgsConstructor
@Slf4j
public class MatchController {

    private final MatchService matchService;

    // 월 별 경기 일정 조회 /matches/:month
    @GetMapping("/{month}")
    public List<MatchListResponse> getMatchList(@PathVariable int month) {
        return matchService.getMatchList(month);
    }

    // 경기 상세 조회 /matches/:match_id/details
    @GetMapping("/{matchId}/details")
    public MatchDetailResponse getMatchDetail(@PathVariable int matchId) {
        return matchService.getMatchDetail(matchId);
    }

}
