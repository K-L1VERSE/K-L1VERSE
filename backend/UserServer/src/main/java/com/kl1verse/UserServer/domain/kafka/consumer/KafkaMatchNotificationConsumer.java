package com.kl1verse.UserServer.domain.kafka.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kl1verse.UserServer.domain.kafka.dto.req.NotificationListReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto.NotificationType;
import com.kl1verse.UserServer.domain.notification.service.NotificationService;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
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
    public void sendMatchNotification(String matchNotificationDataJson) {

        // userIdList를 받아서 알림 주기
        NotificationListReqDto notificationListReqDto = null;
        try {
            notificationListReqDto = objectMapper.readValue(matchNotificationDataJson, NotificationListReqDto.class);

            List<MessageReqDto> messageReqDtoList = new ArrayList<>();
            for(Integer userId : notificationListReqDto.getUserIdList()) {
                log.info("userId : {}", userId);
                MessageReqDto messageReqDto = MessageReqDto.builder()
                    .type(NotificationType.MATCH)
                    .message("경기가 30분 뒤에 시작합니다.")
                    .uri(notificationListReqDto.getUri())
                    .userId(userId)
                    .date(LocalDateTime.now())
                    .homeTeamId(notificationListReqDto.getHomeTeamId())
                    .awayTeamId(notificationListReqDto.getAwayTeamId())
                    .build();
                messageReqDtoList.add(messageReqDto);
            }

            notificationService.sendNotifications(messageReqDtoList);


        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}
