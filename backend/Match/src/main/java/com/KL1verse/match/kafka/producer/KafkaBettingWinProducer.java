package com.KL1verse.match.kafka.producer;

import com.KL1verse.match.betting.dto.Winner;
import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.betting.repository.entity.Betting;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaBettingWinProducer {

    private final KafkaProducer kafkaProducer;
    private final BettingRepository bettingRepository;
    private final MatchRepository matchRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public void bettingWin(int matchId, int winningTeamId) {

        Match match = matchRepository.findById(matchId).orElseThrow();

        int winningTeamBettingTotal = 0;
        int HomeTeamBettingTotal = match.getHomeBettingAmount();
        int AwayTeamBettingTotal = match.getAwayBettingAmount();
        int drawBettingTotal = match.getDrawBettingAmount();

        float rate = 1;

        if (match.getHomeTeamId() == winningTeamId) {
            winningTeamBettingTotal = match.getHomeBettingAmount();
        } else if (match.getAwayTeamId() == winningTeamId) {
            winningTeamBettingTotal = match.getAwayBettingAmount();
        } else {
            winningTeamBettingTotal = match.getDrawBettingAmount();
        }

        if (winningTeamBettingTotal > 0) {
            rate = ((float) HomeTeamBettingTotal + AwayTeamBettingTotal + drawBettingTotal)
                / winningTeamBettingTotal;
        }

        List<Betting> bettingList = bettingRepository.findByMatchIdAndBettingTeamId(matchId,
            winningTeamId);

        if (bettingList.size() > 0) {

            for (int i = 0; i < bettingList.size(); i++) {
                Betting betting = bettingList.get(i);
                int newGoal = Math.round(betting.getAmount() * rate);

                Winner winner = Winner.builder()
                    .userId(betting.getUserId())
                    .newGoal(newGoal)
                    .build();

                String winnerInfoJson = null;
                try {
                    winnerInfoJson = objectMapper.writeValueAsString(winner);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }

                kafkaProducer.sendMessage("winner-info", winnerInfoJson);
            }
        }

        match.setGoalDivided(true);
        matchRepository.save(match);
    }
}
