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

    public void betting(int userId, BettingRequest bettingRequest) {
        // userId 어캄;; ??????????????

        // 1. betting table에 저장
        Betting betting = Betting.builder()
            .userId(userId)
            .matchId(bettingRequest.getMatchId())
            .bettingTeamId(bettingRequest.getBettingTeamId())
            .amount(bettingRequest.getAmount())
            .build();
        bettingRepository.save(betting);

        // game table 수정(matchId를 통해서, betting_team_id로 베팅한 팀 알아내서, 베팅액 올리기)
        Match match = matchRepository.findById(bettingRequest.getMatchId()).orElseThrow();

        // home team에 베팅했으면
        if (betting.getBettingTeamId() == match.getHomeTeamId()) {
            int newAmount = match.getHomeBettingAmount() + betting.getAmount();
            matchRepository.updateHomeBettingAmount(match.getMatchId(), newAmount);

        } else {  // away team에 베팅했으면
            int newAmount = match.getAwayBettingAmount() + betting.getAmount();
            matchRepository.updateAwayBettingAmount(match.getMatchId(), newAmount);
        }

        try {
            // Json으로 바꿔서 보내줌
            String bettingJson = objectMapper.writeValueAsString(betting);
            kafkaProducer.sendMessage("betting", bettingJson);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
