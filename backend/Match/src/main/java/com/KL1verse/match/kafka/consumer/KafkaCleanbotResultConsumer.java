package com.KL1verse.match.kafka.consumer;

import com.KL1verse.match.betting.service.BettingService;
import com.KL1verse.match.chat.dto.res.MessageResDto;
import com.KL1verse.match.kafka.dto.res.CleanbotCheckResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaCleanbotResultConsumer {

    private final SimpMessageSendingOperations sendingOperations;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "cleanbot-chat-output", groupId = "match-group")
    public void cleanbotCheck(String CleanbotCheckResDtoJson) {

        try {
            CleanbotCheckResDto cleanbotCheckResDto = objectMapper.readValue(
                CleanbotCheckResDtoJson, CleanbotCheckResDto.class);

            //TODO 검열된 결과에 대해서 redis 삭제 작업 필요
            if (!cleanbotCheckResDto.getResult()) {
                log.info("Blocked by Cleanbot: {}", cleanbotCheckResDto.getMessageId());
                MessageResDto messageResDto = MessageResDto.builder()
                    .type(MessageResDto.MessageType.REJECT)
                    .messageId(cleanbotCheckResDto.getMessageId())
                    .build();

                sendingOperations.convertAndSend(
                    "/topic/chat/room/" + cleanbotCheckResDto.getRoomId(), messageResDto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
