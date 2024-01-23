package com.kl1verse.UserServer.domain.notification.service;

import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.repository.NotificationRepository;
import com.kl1verse.UserServer.domain.notification.repository.entity.Notification;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.domain.user.repository.UserRepository;
import com.kl1verse.UserServer.domain.user.repository.entity.User;
import com.kl1verse.UserServer.global.ResponseCode;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final SimpMessageSendingOperations sendingOperations;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Transactional
    public void sendNotification(MessageReqDto messageReqDto) {

        log.info("Notification Event: {}", messageReqDto.getType().toString() + " / " + messageReqDto.getMessage());

        User user = userRepository.findById(messageReqDto.getUserId()).orElseThrow(() ->
            new UserException(ResponseCode.INVALID_USER_INFO));

        Notification notification = Notification.builder()
            .user(user)
            .content(messageReqDto.getMessage())
            .uri(messageReqDto.getUri())
            .readFlag(false)
            .type(messageReqDto.getType())
            .createdAt(LocalDateTime.now())
            .build();

        notificationRepository.save(notification);

        sendingOperations.convertAndSend("/topic/notification/" + user.getEmail()+":"+user.getDomain(), messageReqDto);
    }

}
