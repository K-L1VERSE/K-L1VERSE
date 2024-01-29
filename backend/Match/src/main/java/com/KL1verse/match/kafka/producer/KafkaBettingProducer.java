package com.KL1verse.match.kafka.producer;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.betting.repository.entity.Betting;
import com.KL1verse.match.global.ResponseCode;
import com.KL1verse.match.global.dto.BaseResponse;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.match.exception.MatchException;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaBettingProducer {

    private final KafkaProducer kafkaProducer;
    private final BettingRepository bettingRepository;
    private final MatchRepository matchRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public void betting(BettingRequest bettingRequest) {

        /*
        * BettingRequest의 userId가 이미 베팅한 경기인지 확인
        */
        Optional<Betting> bettingOptional = bettingRepository.findByUserIdAndMatchId(bettingRequest.getUserId(), bettingRequest.getMatchId());
        if(bettingOptional.isPresent()) {
            throw new MatchException(ResponseCode.ALREADY_BETTED_MATCH);
        }

        // 1. betting table에 저장
        Betting betting = Betting.builder()
            .userId(bettingRequest.getUserId())
            .matchId(bettingRequest.getMatchId())
            .bettingTeamId(bettingRequest.getBettingTeamId())
            .amount(bettingRequest.getAmount())
            .build();
        bettingRepository.save(betting);

        // game table 수정(matchId를 통해서, betting_team_id로 베팅한 팀 알아내서, 베팅액 올리기)
        Match match = matchRepository.findById(bettingRequest.getMatchId()).orElseThrow(
            () -> new MatchException(ResponseCode.INVALID_MATCH_INFO));

        // home team에 베팅했으면
        if (bettingRequest.getBettingTeamId() == match.getHomeTeamId()) {
            int newAmount = match.getHomeBettingAmount() + betting.getAmount();
            matchRepository.updateHomeBettingAmount(match.getMatchId(), newAmount);
        } else if(bettingRequest.getBettingTeamId() == match.getAwayTeamId()) {  // away team에 베팅했으면
            int newAmount = match.getAwayBettingAmount() + betting.getAmount();
            matchRepository.updateAwayBettingAmount(match.getMatchId(), newAmount);
        } else { // 무승부에 베팅했으면
            int newAmount = match.getDrawBettingAmount() + betting.getAmount();
            matchRepository.updateDrawBettingAmount(match.getMatchId(), newAmount);
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
