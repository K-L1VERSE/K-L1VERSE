package com.KL1verse.Survey.survey.controller;

import com.KL1verse.Survey.survey.dto.req.QuestionDTO;
import com.KL1verse.Survey.survey.dto.req.SurveyDTO;
import com.KL1verse.Survey.survey.dto.req.UserSelectionDTO;
import com.KL1verse.Survey.survey.service.QuestionService;
import com.KL1verse.Survey.survey.service.SurveyService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/surveys")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping("/recommend")
    public ResponseEntity<Integer> recommendTeam(@RequestBody UserSelectionDTO userSelectionDTO) {

        List<Long> selectedAnswers = userSelectionDTO.getSelectedAnswers();
        log.info("selectedAnswers: {}", selectedAnswers);

        int recommendedTeamIndex = surveyService.recommendTeam(selectedAnswers);

        return ResponseEntity.ok().body(recommendedTeamIndex + 1);
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<SurveyDTO> getSurveyById(@PathVariable Long surveyId) {
        SurveyDTO surveyDTO = surveyService.getSurveyById(surveyId);
        if (surveyDTO != null) {
            return new ResponseEntity<>(surveyDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Autowired
    private QuestionService questionService;

    @GetMapping("/questions")
    public ResponseEntity<QuestionDTO> getQuestionDetailsById(
        @RequestParam(name = "questionId") Long questionId) {
        QuestionDTO questionDTO = questionService.getQuestionById(questionId);
        if (questionDTO != null) {
            return new ResponseEntity<>(questionDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}