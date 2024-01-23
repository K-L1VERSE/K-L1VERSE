package com.KL1verse.match.betting.service;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.kafka.KafkaMatchProducer;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BettingServiceImpl implements BettingService {

    private final KafkaMatchProducer kafkaMatchProducer;

    @Override
    public void betting(HttpServletRequest request, BettingRequest bettingRequest) {
        // 베팅하는 메서드임
        /*
        일단 베팅을 한다. (Match도메인 Betting Table, 포트 8040)
        -> 베팅한 유저 골이 db에서 -됨 (User도메인 User Table, 포트 8010)
        경기가 끝난다.
        -> 진 사람 : 그대로
        -> 이긴 사람 : 배율대로 나눠주기
            -> 배팅한 유저 골이 db에서 +됨 (User도메인 User Table, 포트 8010)
        * */

        kafkaMatchProducer.sendMessage("userId-betting", "userId 보내드립니다");

    }

}
