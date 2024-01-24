package com.KL1verse.match.kafka.consumer;

import com.KL1verse.match.betting.service.BettingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaBettingRollbackConsumer {

    private final BettingService bettingService;

    @KafkaListener(topics = "betting-rollback", groupId = "match-group")
    public void rollbackBetting(String bettingId){
        bettingService.bettingCancel(bettingId);
    }

}
