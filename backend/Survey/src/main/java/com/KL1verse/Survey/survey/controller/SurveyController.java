package com.KL1verse.Survey.survey.controller;

import com.KL1verse.Survey.survey.dto.req.UserSelectionDTO;
import com.KL1verse.Survey.survey.service.SurveyService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/survey")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping("/recommend")
    public ResponseEntity<Integer> recommendTeam(@RequestBody UserSelectionDTO userSelectionDTO) {

        // userSelectionDTO에서 선택한 답변들을 추출하여 로직에 활용
        List<Long> selectedAnswers = userSelectionDTO.getSelectedAnswers();
        log.info("selectedAnswers: {}", selectedAnswers);

        // 추천 로직 수행
        int recommendedTeamIndex = surveyService.recommendTeam(selectedAnswers);

        // 성공적인 응답과 함께 추천 결과를 반환
        return ResponseEntity.ok().body(recommendedTeamIndex + 1);
    }
}
