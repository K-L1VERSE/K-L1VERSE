package com.KL1verse.match.chat.controller;

import com.KL1verse.match.chat.dto.req.MessageReqDto;
import com.KL1verse.match.chat.dto.res.MessageResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;
    private static final AtomicLong messageIdCounter = new AtomicLong(0);

    private static Long generateMessageId() {
        return messageIdCounter.incrementAndGet();
    }

    @MessageMapping("/chat/message")
    public void enter(MessageReqDto messageReqDto) {
        MessageResDto message = MessageResDto.builder()
                .messageId(generateMessageId())
                .roomId(messageReqDto.getRoomId())
                .profile(messageReqDto.getProfile())
                .sender(messageReqDto.getSender())
                .message(messageReqDto.getMessage())
                .date(messageReqDto.getDate())
                .profile(messageReqDto.getProfile())
                .build();

        sendingOperations.convertAndSend("/topic/chat/room/" + messageReqDto.getRoomId(), message);

        // Kafka Producing
    }
}
