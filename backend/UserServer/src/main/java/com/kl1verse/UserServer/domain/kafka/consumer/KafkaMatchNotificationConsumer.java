package com.kl1verse.UserServer.domain.kafka.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import com.kl1verse.UserServer.domain.notification.service.NotificationService;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class KafkaMatchNotificationConsumer {

    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "match-notification", groupId = "user-group") // match-group아님, 현재 groupID !
    public void sendMatchNotification(String userIdListJson) {

        // userIdList를 받아서 알림 주기
        List<Integer> userIdList = null;
        try {
            userIdList = objectMapper.readValue(userIdListJson, List.class);

            for(Integer userId : userIdList) {
                log.info("userId : {}", userId);
                MessageReqDto messageReqDto = MessageReqDto.builder()
                    .type(NotificationType.MATCH)
                    .message("경기가 30분 뒤에 시작합니다.")
                    .uri("http://localhost:3000/")
                    .userId(userId)
                    .date(LocalDateTime.now())
                    .build();
                notificationService.sendNotification(messageReqDto);
            }


        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
