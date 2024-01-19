package com.kl1verse.UserServer.domain.chat.controller;

import com.kl1verse.UserServer.domain.chat.dto.req.MessageReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/chat/message")
    public void enter(MessageReqDto message) {
        log.info("Message: {}", message);
        sendingOperations.convertAndSend("/topic/chat/room/" + message.getRoomId(), message);
    }
}
