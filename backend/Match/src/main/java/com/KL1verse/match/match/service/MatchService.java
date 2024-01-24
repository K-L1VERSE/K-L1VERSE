package com.KL1verse.match.match.service;

import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
public interface MatchService {

    List<MatchListResponse> getMatchList(int month);

    MatchDetailResponse getMatchDetail(int matchId);

    List<MatchListResponse> getTodayMatchList();
}
