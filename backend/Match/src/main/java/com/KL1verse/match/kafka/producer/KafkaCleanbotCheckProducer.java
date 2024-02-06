package com.KL1verse.match.kafka.producer;

import com.KL1verse.match.chat.dto.res.MessageResDto;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.kafka.dto.req.CleanbotCheckReqDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaCleanbotCheckProducer {

    private final KafkaProducer kafkaProducer;

    @Autowired
    private ObjectMapper objectMapper;
    public void cleanbotCheck(MessageResDto messageResDto) {
        CleanbotCheckReqDto cleanbotCheckReqDto = CleanbotCheckReqDto.builder()
                .domain("chat")
                .roomId(messageResDto.getRoomId())
                .messageId(messageResDto.getMessageId())
                .content(messageResDto.getMessage())
                .build();

        // kafka로 보내기
        try {
            kafkaProducer.sendMessage("cleanbot-input", objectMapper.writeValueAsString(cleanbotCheckReqDto));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
