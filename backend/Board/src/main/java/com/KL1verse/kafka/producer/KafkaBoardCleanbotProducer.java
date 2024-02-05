package com.KL1verse.kafka.producer;

import com.KL1verse.kafka.KafkaProducer;
import com.KL1verse.kafka.dto.res.BoardCleanbotCheckResDto;
import com.KL1verse.kafka.dto.res.BoardNotificationResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaBoardCleanbotProducer {

    private final KafkaProducer kafkaProducer;

    @Autowired
    private ObjectMapper objectMapper;

    public void boardCleanbotCheck(BoardCleanbotCheckResDto boardCleanbotCheckResDto) {

        // kafka로 보내기
        try {
            kafkaProducer.sendMessage("cleanbot-input",
                objectMapper.writeValueAsString(boardCleanbotCheckResDto));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
