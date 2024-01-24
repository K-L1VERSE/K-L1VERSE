package com.KL1verse.match.betting.controller;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.kafka.producer.KafkaBettingProducer;
import com.KL1verse.match.kafka.producer.KafkaBettingWinProducer;
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
    // test
    private final KafkaBettingWinProducer kafkaBettingWinProducer;

    @GetMapping("/betting")
    public ResponseEntity<?> bettingWinTest() {
        kafkaBettingWinProducer.bettingWin(1,2);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    // 베팅하기
    @PostMapping
    public ResponseEntity<?> betting(@RequestBody BettingRequest bettingRequest) {
        kafkaBettingProducer.betting(bettingRequest);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    // test
    @GetMapping
    public ResponseEntity<?> test() {
        kafkaProducer.sendMessage("betting-test", "match도메인에서 info 보내드립니다");
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

}
