package com.KL1verse.match.betting.controller;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.betting.service.BettingService;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.kafka.producer.KafkaBettingProducer;
import com.KL1verse.match.kafka.producer.KafkaBettingWinProducer;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/bettings")
@RequiredArgsConstructor
@Slf4j
public class BettingController {

    private final KafkaProducer kafkaProducer;
    private final KafkaBettingProducer kafkaBettingProducer;
    private final KafkaBettingWinProducer kafkaBettingWinProducer;
    private final BettingService bettingService;

    @PostMapping
    public ResponseEntity<?> betting(@RequestBody BettingRequest bettingRequest) {
        kafkaBettingProducer.betting(bettingRequest);
        log.info("bettingRequest: {}==========================", bettingRequest);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> checkBetting(@RequestParam("matchId") int matchId,
        @RequestParam("userId") int userId) {
        int betGoal = bettingService.checkBetting(matchId, userId);
        int betTeamId = -1;
        if(betGoal > 0) {
            betTeamId = bettingService.checkBettingTeam(matchId, userId);
        }
        Map<String, Integer> response = new HashMap<>();
        response.put("betGoal", betGoal);
        response.put("betTeamId", betTeamId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @GetMapping("/betting")
    public ResponseEntity<?> bettingWinTest() {
        kafkaBettingWinProducer.bettingWin(1, 2);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

}
