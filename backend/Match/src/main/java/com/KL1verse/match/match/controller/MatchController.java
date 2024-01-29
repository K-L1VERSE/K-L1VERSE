package com.KL1verse.match.match.controller;

import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.dto.res.TimelineResponse;
import com.KL1verse.match.match.service.MatchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{month}")
    public ResponseEntity<List<MatchListResponse>> getMatchList(@PathVariable("month") int month) {
        List<MatchListResponse> matchList = matchService.getMatchList(month);
        return new ResponseEntity<>(matchList, HttpStatus.OK);
    }

    @GetMapping("/{matchId}/details")
    public ResponseEntity<MatchDetailResponse> getMatchDetail(
        @PathVariable("matchId") int matchId) {
        MatchDetailResponse matchDetail = matchService.getMatchDetail(matchId);
        return new ResponseEntity<>(matchDetail, HttpStatus.OK);
    }

    @GetMapping("/today")
    public ResponseEntity<List<MatchListResponse>> getTodayMatch() {
        List<MatchListResponse> todayMatchList = matchService.getTodayMatchList();
        return new ResponseEntity<>(todayMatchList, HttpStatus.OK);
    }

    @GetMapping("/{matchId}/timelines")
    public ResponseEntity<List<TimelineResponse>> getTimelines(@PathVariable int matchId) {
        List<TimelineResponse> timelineResponse = matchService.getTimeline(matchId);
        return new ResponseEntity<>(timelineResponse, HttpStatus.OK);
    }

}
