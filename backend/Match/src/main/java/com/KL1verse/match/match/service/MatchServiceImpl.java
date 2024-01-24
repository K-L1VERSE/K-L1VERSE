package com.KL1verse.match.match.service;

import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;

    @Override
    public List<MatchListResponse> getMatchList(int month) {

        List<Match> matchList = matchRepository.findByMonth(month);
        List<MatchListResponse> matchListResponses = new ArrayList<>();

        for(Match match : matchList) {
            matchListResponses.add(MatchListResponse.builder()
                .matchId(match.getMatchId())
                .homeTeamName(matchRepository.findOneByTeamId(match.getHomeTeamId()))
                .awayTeamName(matchRepository.findOneByTeamId(match.getAwayTeamId()))
                .matchAt(match.getMatchAt())
                .homeScore(match.getHomeScore())
                .awayScore(match.getAwayScore())
                .build());
        }

        return matchListResponses;
    }

    @Override
    public MatchDetailResponse getMatchDetail(int matchId) {

        Match match = matchRepository.findByMatchId(matchId).orElse(null);

        return MatchDetailResponse.builder()
            .homeTeamId(match.getHomeTeamId())
            .awayTeamId(match.getAwayTeamId())
            .homeTeamName(matchRepository.findOneByTeamId(match.getHomeTeamId()))
            .awayTeamName(matchRepository.findOneByTeamId(match.getAwayTeamId()))
            .homeBettingAmount(match.getHomeBettingAmount())
            .awayBettingAmount(match.getAwayBettingAmount())
            .matchAt(match.getMatchAt())
            .status(match.getStatus())
            .homeScore(match.getHomeScore())
            .awayScore(match.getAwayScore())
            .build();
    }

    @Override
    public List<MatchListResponse> getTodayMatchList() {
        LocalDateTime now = LocalDateTime.now();
        List<Match> matchList = matchRepository.findByDate(now.getYear(), now.getMonthValue(), now.getDayOfMonth());
        List<MatchListResponse> matchListResponse = new ArrayList<>();

        for (Match match : matchList) {
            matchListResponse.add(MatchListResponse.builder()
                .matchId(match.getMatchId())
                .homeTeamName(matchRepository.findOneByTeamId(match.getHomeTeamId()))
                .awayTeamName(matchRepository.findOneByTeamId(match.getAwayTeamId()))
                .matchAt(match.getMatchAt())
                .homeScore(match.getHomeScore())
                .awayScore(match.getAwayScore())
                .build());
        }
        return matchListResponse;
    }
}
