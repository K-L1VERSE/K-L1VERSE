package com.KL1verse.Crawl.domain.kafka.dto.producer;

import com.KL1verse.Crawl.domain.news.dto.res.NewsResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaNewsNotificationProducer {

    private final KafkaProducer kafkaProducer;


    @Autowired
    private ObjectMapper objectMapper;

    public void newsNotification(NewsResDto newsResDto) {

        try {
            kafkaProducer.sendMessage("news-notification", objectMapper.writeValueAsString(newsResDto));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
