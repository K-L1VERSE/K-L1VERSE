package com.kl1verse.UserServer.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kl1verse.UserServer.domain.betting.BettingEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaUserConsumer {

    @Autowired
    private ObjectMapper objectMapper;


    // test
    @KafkaListener(topics = "betting-test", groupId = "user-group") // match-group아님, 현재 groupID !
    public void kafkaTest(String data){
        System.out.println(data);
        System.out.println("UserServer KafkaTest Consumer에서 받았습니다아아 11");
    }

    @KafkaListener(topics = "betting", groupId = "user-group") // match-group아님, 현재 groupID !
    public void betting(String data){

        try {
            BettingEntity bet = objectMapper.readValue(data, BettingEntity.class);

            System.out.println(bet.getMatchId()); // 1
            System.out.println(bet.getBettingTeamId()); // 1
            System.out.println(bet.getAmount()); // 53

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            // JSON 문자열을 Betting 객체로 변환하는 도중에 예외가 발생한 경우

        }
    }



}
