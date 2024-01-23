package com.KL1verse.Survey.survey.service;

import com.KL1verse.Survey.survey.dto.req.AnswerDTO;
import com.KL1verse.Survey.survey.dto.req.QuestionDTO;
import com.KL1verse.Survey.survey.repository.AnswerRepository;
import com.KL1verse.Survey.survey.repository.QuestionRepository;
import com.KL1verse.Survey.survey.repository.entity.Answer;
import com.KL1verse.Survey.survey.repository.entity.Question;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public QuestionDTO getQuestionById(Long questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);

        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();
            QuestionDTO questionDTO = new QuestionDTO();
            // Question 객체의 속성을 QuestionDTO 객체로 복사
            BeanUtils.copyProperties(question, questionDTO);
            // 해당 질문에 대한 답변 목록을 가져오기
            questionDTO.setAnswers(getAnswersByQuestionId(question.getQuestionId()));
            return questionDTO;
        }

        return null;
    }

    private List<AnswerDTO> getAnswersByQuestionId(Long questionId) {
        List<Answer> answers = answerRepository.findByQuestionQuestionId(questionId);
        List<AnswerDTO> answerDTOs = new ArrayList<>();
        // Answer 목록을 순회하면서 각각의 Answer를 AnswerDTO로 변환하여 리스트에 추가
        for (Answer answer : answers) {
            AnswerDTO answerDTO = new AnswerDTO();
            BeanUtils.copyProperties(answer, answerDTO);
            answerDTOs.add(answerDTO);
        }

        return answerDTOs;
    }
}