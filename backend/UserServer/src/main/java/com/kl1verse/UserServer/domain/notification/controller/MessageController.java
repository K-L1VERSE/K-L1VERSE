package com.kl1verse.UserServer.domain.notification.controller;

import com.kl1verse.UserServer.domain.notification.dto.req.MessageReqDto;
import com.kl1verse.UserServer.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MessageController {

    private final NotificationService notificationService;

    @MessageMapping("/notification/message")
    public void enter(MessageReqDto messageReqDto) {
        notificationService.sendNotification(messageReqDto);
    }
}
