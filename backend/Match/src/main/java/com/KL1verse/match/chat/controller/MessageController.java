package com.KL1verse.match.chat.controller;

import com.KL1verse.match.chat.dto.req.MessageReqDto;
import com.KL1verse.match.chat.dto.res.MessageResDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.KL1verse.match.kafka.producer.KafkaCleanbotCheckProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;
    private final KafkaCleanbotCheckProducer kafkaCleanbotCheckProducer;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    private static final AtomicLong messageIdCounter = new AtomicLong(0);

    private static Long generateMessageId() {
        return messageIdCounter.incrementAndGet();
    }

    @MessageMapping("/chat/message")
    public void enter(MessageReqDto messageReqDto) {

        try {

            String jsonMessageReqDto = objectMapper.writeValueAsString(messageReqDto);

            // 레디스에 메시지 저장
            redisTemplate.opsForList()
                .rightPush("chat/room/" + messageReqDto.getRoomId(), jsonMessageReqDto);

            sendingOperations.convertAndSend("/topic/chat/room/" + messageReqDto.getRoomId(),
                messageReqDto);

            MessageResDto messageResDto = MessageResDto.builder()
                .messageId(generateMessageId())
                .profile(messageReqDto.getProfile())
                .roomId(messageReqDto.getRoomId())
                .sender(messageReqDto.getSender())
                .message(messageReqDto.getMessage())
                .date(messageReqDto.getDate())
                .profile(messageReqDto.getProfile())
                .build();

            // Kafka Producing
            kafkaCleanbotCheckProducer.cleanbotCheck(messageResDto);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // Kafka Producing
    }

    @GetMapping("/chat/message/{roomId}")
    public ResponseEntity<?> getPrevChatMessage(@PathVariable(name = "roomId") String roomId) {

        List<String> jsonMessages = redisTemplate.opsForList().range("chat/room/" + roomId, 0, -1);
        List<MessageReqDto> messages = new ArrayList<>();

        if (!jsonMessages.isEmpty()) {
            for (String jsonMessage : jsonMessages) {
                try {
                    MessageReqDto message = objectMapper.readValue(jsonMessage,
                        MessageReqDto.class);
                    messages.add(message);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return ResponseEntity.ok().body(messages);
    }
}