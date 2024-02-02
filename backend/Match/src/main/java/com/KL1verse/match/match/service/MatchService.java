package com.KL1verse.match.match.service;

import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.dto.res.TimelineResponse;
import com.KL1verse.match.match.repository.entity.Match;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public interface MatchService {

    List<MatchListResponse> getMatchList(int year, int month);

    MatchDetailResponse getMatchDetail(int matchId);

    List<MatchListResponse> getTodayMatchList();

    @Transactional
    void getScore(Match match);

    @Transactional
    void saveTimeline(int matchYear, int gameId, int meetSeq, int matchId);

    List<TimelineResponse> getTimeline(int matchId);
}
