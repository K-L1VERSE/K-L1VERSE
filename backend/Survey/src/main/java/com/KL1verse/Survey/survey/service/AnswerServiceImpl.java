package com.KL1verse.Survey.survey.service;


import com.KL1verse.Survey.survey.dto.req.AnswerDTO;
import com.KL1verse.Survey.survey.repository.AnswerRepository;
import com.KL1verse.Survey.survey.repository.entity.Answer;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public List<AnswerDTO> getAnswersByQuestionId(Long questionId) {
        List<Answer> answers = answerRepository.findByQuestionQuestionId(questionId);
        List<AnswerDTO> answerDTOs = new ArrayList<>();

        for (Answer answer : answers) {
            AnswerDTO answerDTO = new AnswerDTO();
            // 현재 Answer 객체의 속성을 AnswerDTO 객체로 복사

            BeanUtils.copyProperties(answer, answerDTO);
            // 생성된 AnswerDTO 객체를 answerDTOs 목록에 추가
            answerDTOs.add(answerDTO);
        }

        return answerDTOs;

    }


}