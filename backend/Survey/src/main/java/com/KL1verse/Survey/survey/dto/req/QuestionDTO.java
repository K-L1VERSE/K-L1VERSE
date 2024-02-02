package com.KL1verse.Survey.survey.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionDTO {

    private Long questionId;
    private String content;
    private List<AnswerDTO> answers;

}
