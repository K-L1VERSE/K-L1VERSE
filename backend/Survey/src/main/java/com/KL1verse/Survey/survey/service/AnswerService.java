package com.KL1verse.Survey.survey.service;

import com.KL1verse.Survey.survey.dto.req.AnswerDTO;
import java.util.List;


public interface AnswerService {
    List<AnswerDTO> getAnswersByQuestionId(Long questionId);
}



