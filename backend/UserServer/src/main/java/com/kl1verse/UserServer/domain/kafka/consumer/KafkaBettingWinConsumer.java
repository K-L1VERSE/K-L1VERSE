package com.kl1verse.UserServer.domain.kafka.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kl1verse.UserServer.domain.betting.Winner;
import com.kl1verse.UserServer.domain.kafka.KafkaUserRepository;
import com.kl1verse.UserServer.domain.kafka.producer.KafkaProducer;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.service.NotificationService;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import java.time.LocalDateTime;
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
public class KafkaBettingWinConsumer {

    private final KafkaUserRepository kafkaUserRepository;
    private final KafkaProducer kafkaProducer;
    private final NotificationService notificationService;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    @KafkaListener(topics = "winner-info", groupId = "user-group")
    public void divideGoal(String winnerInfoJson) {

        Winner winner = null;

        try {
            winner = objectMapper.readValue(winnerInfoJson, Winner.class);
            User user = kafkaUserRepository.findById(winner.getUserId()).orElseThrow();

            kafkaUserRepository.updateGoal(winner.getUserId(),
                user.getGoal() + winner.getNewGoal());
            kafkaUserRepository.updateWinBet(winner.getUserId(), user.getWinBet() + 1);
            notificationService.sendNotification(MessageReqDto.builder()
                .type(MessageReqDto.NotificationType.GOAL)
                .userId(winner.getUserId())
                .uri("/mypage")
                .message("베팅 보상으로 " + winner.getNewGoal() + "골이 지급되었습니다.")
                .date(LocalDateTime.now())
                .build());

        } catch (Exception e) { // betting 정산할 때 오류 생겨서 rollback할 때
            if (winner != null) {
                kafkaProducer.sendMessage("betting-divided-rollback",
                    String.valueOf(winner.getMatchId()));
            }
            e.printStackTrace();
        }
    }

    private void error() throws Exception {
        throw new Exception("Random error occurred!");
    }

}
