package com.KL1verse.Survey.survey.dto.req;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionDTO {

    private Long questionId;
    private String content;
    private List<AnswerDTO> answers;

}
