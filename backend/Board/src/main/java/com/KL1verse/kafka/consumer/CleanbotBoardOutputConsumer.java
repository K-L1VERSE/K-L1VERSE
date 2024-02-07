package com.KL1verse.kafka.consumer;

import com.KL1verse.Waggle.service.WaggleService;
import com.KL1verse.kafka.dto.res.CleanbotCheckResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
@Service
public class CleanbotBoardOutputConsumer {

    private final WaggleService waggleService;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
//    @KafkaListener(topics = "cleanbot-board-output", groupId = "waggle-group")
    public void cleanbotCheck(String WaggleCleanbotCheckResDtoJson) {

        try {
            CleanbotCheckResDto CleanbotCheckResDto = objectMapper.readValue(
                WaggleCleanbotCheckResDtoJson, CleanbotCheckResDto.class);
            log.info("CleanbotCheckResDto: {}", CleanbotCheckResDto.toString());
            if (!CleanbotCheckResDto.getResult()) {
                log.info("Blocked by Cleanbot: {}", CleanbotCheckResDto.getId());
                waggleService.blockedByCleanbotCheck(CleanbotCheckResDto.getId());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void error() throws Exception {
        throw new Exception("Random error occurred!");
    }

}