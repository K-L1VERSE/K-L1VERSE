package com.KL1verse.match.betting.controller;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import com.KL1verse.match.betting.service.BettingService;
import com.KL1verse.match.kafka.KafkaMatchProducer;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.service.MatchService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final KafkaMatchProducer kafkaMatchProducer;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<?> test() {
        kafkaMatchProducer.sendMessage("betting-test", "match도메인에서 info 보내드립니다");
        return new ResponseEntity<>("success", HttpStatus.OK);
    }


    // 베팅하기
    @PostMapping
    public ResponseEntity<?> betting(@RequestBody BettingRequest bettingRequest) {
        // HttpServletRequest request,
        // betting table에 저장 + game table 수정(matchId를 통해서, betting_team_id로 베팅한 팀 알아내서, 베팅액 올리기)
        // bettingService.betting(request, bettingRequest);

        // user에 보내줘야함(request랑 bettingRequest 다 보내줘야함)

        try {
            // Json으로 바꿔서 보내줌
            String bettingRequestJson = objectMapper.writeValueAsString(bettingRequest);
            kafkaMatchProducer.sendMessage("betting", bettingRequestJson);
            
            return new ResponseEntity<>("success", HttpStatus.OK);
            
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
