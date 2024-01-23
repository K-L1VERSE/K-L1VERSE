package com.KL1verse.match.betting.controller;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.kafka.producer.KafkaBettingProducer;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bettings")
@RequiredArgsConstructor
@Slf4j
public class BettingController {

    private final KafkaProducer kafkaProducer;
    private final KafkaBettingProducer kafkaBettingProducer;


    // 베팅하기
    @PostMapping
    public ResponseEntity<?> betting(HttpServletRequest request, @RequestBody BettingRequest bettingRequest) {
        // 1. request 안에 accessToken 있음 !

        // 2. 어랏 근데 userId(숫자)를 받아야하는데?? betting table에 넣어야함..
        String userId = "1";

        // 3. betting하기
        kafkaBettingProducer.betting(Integer.parseInt(userId), bettingRequest);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    // test
    @GetMapping
    public ResponseEntity<?> test() {
        kafkaProducer.sendMessage("betting-test", "match도메인에서 info 보내드립니다");
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

}
