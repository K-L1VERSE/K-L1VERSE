package com.KL1verse.match.betting.service;

import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.betting.repository.entity.Betting;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BettingServiceImpl implements BettingService {

    private final BettingRepository bettingRepository;
    private final MatchRepository matchRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    @Transactional
    public void bettingCancel(String bettingId) {

        Betting betting = bettingRepository.findById(Integer.parseInt(bettingId)).orElseThrow();

        Match match = matchRepository.findById(betting.getMatchId()).orElseThrow();

        if (betting.getBettingTeamId() == match.getHomeTeamId()) {
            int newAmount = match.getHomeBettingAmount() - betting.getAmount();
            matchRepository.updateHomeBettingAmount(match.getMatchId(), newAmount);
        } else if (betting.getBettingTeamId() == match.getAwayTeamId()) {
            int newAmount = match.getAwayBettingAmount() - betting.getAmount();
            matchRepository.updateAwayBettingAmount(match.getMatchId(), newAmount);
        } else {
            int newAmount = match.getDrawBettingAmount() - betting.getAmount();
            matchRepository.updateDrawBettingAmount(match.getMatchId(), newAmount);
        }

        bettingRepository.deleteById(Integer.parseInt(bettingId));

    }

    @Override
    public int checkBetting(int matchId, int userId) {

        int flag = bettingRepository.findNumByMatchIdAndUserId(matchId, userId);
        if (flag == 0) {
            return 0;
        } else {
            int n = bettingRepository.findAmountByMatchIdAndUserId(matchId, userId);
            return n;
        }

    }

    @Override
    public int checkBettingTeam(int matchId, int userId) {
        int teamId = bettingRepository.findTeamByMatchIdAndUserId(matchId, userId);
        return teamId;
    }

    @Override
    public void dividedCancel(String matchId) {
        Match match = matchRepository.findById(Integer.parseInt(matchId)).orElseThrow();
        if(match.getGoalDivided()) {
            match.setGoalDivided(false);
            matchRepository.save(match);
        }
    }

}
