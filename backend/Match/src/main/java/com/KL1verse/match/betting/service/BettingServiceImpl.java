package com.KL1verse.match.betting.service;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.betting.repository.entity.Betting;
import com.KL1verse.match.kafka.KafkaMatchProducer;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BettingServiceImpl implements BettingService {

    private final KafkaMatchProducer kafkaMatchProducer;
    private final BettingRepository bettingRepository;
    private final MatchRepository matchRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void betting(int userId, BettingRequest bettingRequest) {
        // userId 어캄;; ??????????????

        // 1. betting table에 저장
        Betting betting = Betting.builder()
                .userId(userId)
                .matchId(Integer.parseInt(bettingRequest.getMatchId()))
                .bettingTeamId(Integer.parseInt(bettingRequest.getBettingTeamId()))
                .amount(Integer.parseInt(bettingRequest.getAmount()))
                .build();
        bettingRepository.save(betting);

        // game table 수정(matchId를 통해서, betting_team_id로 베팅한 팀 알아내서, 베팅액 올리기)
        Match match = matchRepository.findById(Integer.parseInt(bettingRequest.getMatchId())).orElseThrow();

        if (betting.getBettingTeamId() == match.getHomeTeamId()) { // home team에 베팅했으면
            match.setHomeBettingAmount(match.getHomeBettingAmount() + betting.getAmount());
            matchRepository.updateHomeBettingAmount(match.getHomeBettingAmount(), match.getMatchId());
        } else { // away team에 베팅했으면
            match.setAwayBettingAmount(match.getAwayBettingAmount() + betting.getAmount());
            matchRepository.updateAwayBettingAmount(match.getAwayBettingAmount(), match.getMatchId());
        }

        try {
            // Json으로 바꿔서 보내줌
            String bettingJson = objectMapper.writeValueAsString(betting);
            kafkaMatchProducer.sendMessage("betting", bettingJson);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
