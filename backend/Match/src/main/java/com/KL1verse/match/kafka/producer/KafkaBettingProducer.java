package com.KL1verse.match.kafka.producer;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.betting.repository.entity.Betting;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaBettingProducer {

    private final KafkaProducer kafkaProducer;
    private final BettingRepository bettingRepository;
    private final MatchRepository matchRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public void betting(BettingRequest bettingRequest) {

        Betting betting = Betting.builder()
            .userId(bettingRequest.getUserId())
            .matchId(bettingRequest.getMatchId())
            .bettingTeamId(bettingRequest.getBettingTeamId())
            .amount(bettingRequest.getAmount())
            .build();
        bettingRepository.save(betting);

        Match match = matchRepository.findById(bettingRequest.getMatchId()).orElseThrow();

        if (betting.getBettingTeamId() == match.getHomeTeamId()) {
            int newAmount = match.getHomeBettingAmount() + betting.getAmount();
            matchRepository.updateHomeBettingAmount(match.getMatchId(), newAmount);
        } else if (betting.getBettingTeamId() == match.getAwayTeamId()) {
            int newAmount = match.getAwayBettingAmount() + betting.getAmount();
            matchRepository.updateAwayBettingAmount(match.getMatchId(), newAmount);
        } else {
            int newAmount = match.getDrawBettingAmount() + betting.getAmount();
            matchRepository.updateDrawBettingAmount(match.getMatchId(), newAmount);
        }

        try {
            String bettingJson = objectMapper.writeValueAsString(betting);
            kafkaProducer.sendMessage("betting", bettingJson);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
