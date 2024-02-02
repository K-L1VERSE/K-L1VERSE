package com.KL1verse.Survey.survey.service;

import com.KL1verse.Survey.survey.dto.req.SurveyDTO;
import java.util.List;


public interface SurveyService {

    int recommendTeam(List<Long> userSelection);

    SurveyDTO getSurveyById(Long surveyId);
}


