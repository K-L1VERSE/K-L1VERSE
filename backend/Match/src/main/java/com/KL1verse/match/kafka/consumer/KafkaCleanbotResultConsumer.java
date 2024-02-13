package com.KL1verse.match.kafka.consumer;

import com.KL1verse.match.chat.dto.res.MessageResDto;
import com.KL1verse.match.kafka.dto.res.CleanbotCheckResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaCleanbotResultConsumer {

    private final StringRedisTemplate redisTemplate;
    private final SimpMessageSendingOperations sendingOperations;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "cleanbot-chat-output", groupId = "match-group")
    public void cleanbotCheck(String CleanbotCheckResDtoJson) {

        try {
            CleanbotCheckResDto cleanbotCheckResDto = objectMapper.readValue(
                CleanbotCheckResDtoJson, CleanbotCheckResDto.class);
            log.info("match | CleanbotCheckResDto: {}", cleanbotCheckResDto.toString());

            //TODO 검열된 결과에 대해서 redis 삭제 작업 필요
            if (!cleanbotCheckResDto.getResult()) {
                MessageResDto messageResDto = MessageResDto.builder()
                    .type("REJECT")
                    .messageId(cleanbotCheckResDto.getMessageId())
                    .build();
                log.info("Blocked by Cleanbot in room#{} : {}",
                    cleanbotCheckResDto.getRoomId(), messageResDto.toString());

                sendingOperations.convertAndSend(
                    "/topic/chat/room/" + cleanbotCheckResDto.getRoomId(), messageResDto);

                // redis에서 전체 메시지 꺼내오고 id에 해당하는 메시지 삭제
                Objects.requireNonNull(redisTemplate.opsForList()
                        .range("chat/room/" + cleanbotCheckResDto.getRoomId(), 0, -1))
                    .forEach(message -> {
                        try {
                            MessageResDto messageRes = objectMapper.readValue(message,
                                MessageResDto.class);
                            if (messageRes.getMessageId()
                                .equals(cleanbotCheckResDto.getMessageId())) {
                                redisTemplate.opsForList()
                                    .remove("chat/room/" + cleanbotCheckResDto.getRoomId(), 1,
                                        message);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
