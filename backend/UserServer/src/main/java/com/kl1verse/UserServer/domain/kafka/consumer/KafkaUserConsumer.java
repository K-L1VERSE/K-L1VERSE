package com.kl1verse.UserServer.domain.kafka.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kl1verse.UserServer.domain.betting.BettingEntity;
import com.kl1verse.UserServer.domain.kafka.KafkaUserRepository;
import com.kl1verse.UserServer.domain.kafka.producer.KafkaProducer;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
@Service
public class KafkaUserConsumer {

    private final KafkaUserRepository kafkaUserRepository;
    private final KafkaProducer kafkaProducer;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    @KafkaListener(topics = "betting", groupId = "user-group") // match-group아님, 현재 groupID !
    public void betting(String data) {

        BettingEntity bet = null;

        try {
            bet = objectMapper.readValue(data, BettingEntity.class);

            // 롤백 확인하기 위한 error 발생
            // error();

            User user = kafkaUserRepository.findById(bet.getUserId()).orElseThrow();
            // user의 goal 감소 (베팅한 만큼)
            kafkaUserRepository.updateGoal(user.getId(), user.getGoal() - bet.getAmount());
            // user의 전체 베팅 횟수 증가 +1
            kafkaUserRepository.updateTotalBet(user.getId(), user.getTotalBet() + 1);

        } catch (Exception e) { // betting 할 때 오류생겨서 rollback할 때
            log.error("======== [Rollback] betting-rollback, bettingId :{}======== ", bet.getBettingId());
            // match로 rollback 메시지 보내기
            kafkaProducer.sendMessage("betting-rollback", String.valueOf(bet.getBettingId()));
            e.printStackTrace();
        }
    }

    private void error() throws Exception {
        throw new Exception("Random error occurred!");
    }

    // test
//    @KafkaListener(topics = "betting-test", groupId = "user-group") // match-group아님, 현재 groupID !
    public void kafkaTest(String data){
        System.out.println(data);
        System.out.println("UserServer KafkaTest Consumer에서 받았습니다아아 11");
    }

}
