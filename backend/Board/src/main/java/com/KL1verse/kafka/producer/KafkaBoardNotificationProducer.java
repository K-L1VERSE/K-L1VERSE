package com.KL1verse.kafka.producer;

import com.KL1verse.kafka.KafkaProducer;
import com.KL1verse.kafka.dto.res.BoardNotificationResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaBoardNotificationProducer {

    private final KafkaProducer kafkaProducer;


    @Autowired
    private ObjectMapper objectMapper;

    public void boardNotification(BoardNotificationResDto boardNotificationResDto) {

        // kafka로 보내기
        try {
            kafkaProducer.sendMessage("board-notification", objectMapper.writeValueAsString(boardNotificationResDto));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
