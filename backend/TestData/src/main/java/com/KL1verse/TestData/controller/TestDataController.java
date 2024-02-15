package com.KL1verse.TestData.controller;

import com.KL1verse.TestData.dto.res.TestDataResDto;
import com.KL1verse.TestData.service.TestDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/timelines")
@RequiredArgsConstructor
public class TestDataController {

    private final TestDataService testDataService;

    @CrossOrigin(originPatterns = "*")
    @GetMapping("/{matchId}")
    public ResponseEntity<List<TestDataResDto>> getTimelines(@PathVariable(name = "matchId") int matchId) {
        List<TestDataResDto> timelineResponse = testDataService.getTimelines(matchId);
        return new ResponseEntity<>(timelineResponse, HttpStatus.OK);
    }

    @GetMapping("/hello")
    public String hello() {
        log.info(("Hello World!"));
        return "Hello World!";
    }
}
