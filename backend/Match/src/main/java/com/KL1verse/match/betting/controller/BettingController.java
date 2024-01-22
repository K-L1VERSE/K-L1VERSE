package com.KL1verse.match.betting.controller;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.betting.service.BettingService;
import com.KL1verse.match.kafka.KafkaMatchProducer;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.service.MatchService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bettings")
@RequiredArgsConstructor
@Slf4j
public class BettingController {

    private final BettingService bettingService;

    //test
    private final KafkaMatchProducer kafkaMatchProducer;

    @GetMapping
    public ResponseEntity<?> test() {
        kafkaMatchProducer.sendMessage("betting-test", "match도메인에서 info 보내드립니다");
        return new ResponseEntity<>("success", HttpStatus.OK);
    }


    // 베팅하기
    @PostMapping
    public ResponseEntity<?> betting(HttpServletRequest request, @RequestBody BettingRequest bettingRequest) {
        bettingService.betting(request, bettingRequest);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

}
