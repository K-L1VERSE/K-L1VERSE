package com.KL1verse.match.kafka.producer;

import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.betting.repository.entity.Betting;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.kafka.dto.res.MatchNotificationResDto;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaMatchNotificationProducer {

    private final KafkaProducer kafkaProducer;
    private final BettingRepository bettingRepository;
    private final MatchRepository matchRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${domain}")
    private String domain;

    public void matchNotification(int matchId) {

        // matchId로 betting한 userId 찾기
        //userId List를 UserServer로 넘기기
        List<Betting> bettingList = bettingRepository.findByMatchId(matchId);
        List<Integer> userIdList = new ArrayList<>();
        for(Betting betting : bettingList) {
            userIdList.add(betting.getUserId());
        }

        Match match = matchRepository.findById(matchId).orElseThrow();
        MatchNotificationResDto matchNotificationResDto = MatchNotificationResDto.builder()
            .userIdList(userIdList)
            .homeTeamId(String.valueOf(match.getHomeTeamId()))
            .awayTeamId(String.valueOf(match.getAwayTeamId()))
            .uri("/match/" + String.valueOf(matchId))
            .build();

        // kafka로 보내기
        try {
            kafkaProducer.sendMessage("match-notification", objectMapper.writeValueAsString(matchNotificationResDto));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
