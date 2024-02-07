package com.kl1verse.UserServer.domain.kafka.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kl1verse.UserServer.domain.kafka.dto.req.NewsNotificationListReqDto;
import com.kl1verse.UserServer.domain.kafka.dto.req.NotificationListReqDto;
import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.service.NotificationService;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class KafkaNewsNotificationConsumer {

    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Autowired
    private ObjectMapper objectMapper;

//    @KafkaListener(topics = "news-notification", groupId = "user-group") // match-group아님, 현재 groupID !
    public void sendNewsNotification(String newsNotificationDataJson) {

        // userIdList를 받아서 알림 주기
        NewsNotificationListReqDto newsNotificationListReqDto = null;
        try {
            newsNotificationListReqDto = objectMapper.readValue(newsNotificationDataJson, NewsNotificationListReqDto.class);

            String badgeDetailId = newsNotificationListReqDto.getBadgeDetailId();
            log.info(badgeDetailId);

            List<User> userList = userRepository.findByBadgeDetailId(badgeDetailId);

            List<MessageReqDto> messageReqDtoList = new ArrayList<>();
            for(User user : userList) {
                log.info("userId : {}", user.getId());

                for(int i=0; i<newsNotificationListReqDto.getTitle().size(); i++) {
                    MessageReqDto messageReqDto = MessageReqDto.builder()
                            .type(MessageReqDto.NotificationType.NEWS)
                            .message(newsNotificationListReqDto.getTitle().get(i))
                            .uri(newsNotificationListReqDto.getUri().get(i))
                            .userId(user.getId())
                            .date(LocalDateTime.now())
                            .build();
                    messageReqDtoList.add(messageReqDto);
                }
            }

            notificationService.sendNotifications(messageReqDtoList);


        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
