package com.kl1verse.UserServer.domain.kafka.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@RequiredArgsConstructor
@Service
public class KafkaBettingRollbackProducer {

    private final KafkaProducer kafkaMatchProducer;

}