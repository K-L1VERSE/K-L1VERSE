package com.KL1verse.match.match.service;

import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
public interface MatchService {

    List<MatchListResponse> getMatchList(int month) throws JsonProcessingException;

    MatchDetailResponse getMatchDetail(int matchId);

    void getScore(String url, Object data)
        throws JsonProcessingException;
}
