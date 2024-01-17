package com.KL1verse.Survey.survey.controller;

import com.KL1verse.Survey.survey.service.SurveyService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/survey")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping("/recommend")
    public String recommendTeam(@RequestBody List<Integer> userSelection) {
        return surveyService.recommendTeam(userSelection);
    }
}