package com.KL1verse.Survey.survey.service;

import com.KL1verse.Survey.survey.dto.req.QuestionDTO;


public interface QuestionService {
    QuestionDTO getQuestionById(Long questionId);
}


