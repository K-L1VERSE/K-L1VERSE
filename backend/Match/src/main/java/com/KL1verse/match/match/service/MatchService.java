package com.KL1verse.match.match.service;

import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public interface MatchService {

    List<MatchListResponse> getMatchList(int month);

    MatchDetailResponse getMatchDetail(int matchId);

    @Transactional
    void getScore(Match match);

    void getTimeline(int matchYear, int gameId, int meetSeq);
}
