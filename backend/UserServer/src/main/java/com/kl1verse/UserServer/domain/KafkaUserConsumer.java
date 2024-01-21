package com.kl1verse.UserServer.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaUserConsumer {
    @KafkaListener(topics = "betting-good", groupId = "user-group") // 왜 match-group아님?
    public void kafkaTest(String data){
        System.out.println(data);
        System.out.println("UserServer Kafka Consumer에서 받았습니다아아");
    }
}
