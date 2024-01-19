package com.KL1verse.Survey.survey.service;


import com.KL1verse.Survey.survey.dto.req.SurveyDTO;
import com.KL1verse.Survey.survey.repository.SurveyRepository;
import com.KL1verse.Survey.survey.repository.WeightRepository;
import com.KL1verse.Survey.survey.repository.entity.Survey;
import com.KL1verse.Survey.survey.repository.entity.Weight;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SurveyServiceImpl implements SurveyService {

    @Autowired
    private WeightRepository weightRepository;

    // 팀 추천 로직 구현
    @Override
    public int recommendTeam(List<Long> userSelection) {
        List<Weight> weights = new ArrayList<>();
        for (long answerId : userSelection) {
            weights.addAll(weightRepository.findByAnswer_AnswerId(answerId));
        }

        if (!weights.isEmpty()) {
            List<Integer> totalWeights = calculateTotalWeights(weights);
            return findRecommendedTeamIndex(totalWeights);
        } else {
            return 0; // 0 반환
        }
    }

    private List<Integer> calculateTotalWeights(List<Weight> weights) {
        List<Integer> totalWeights = new ArrayList<>(Collections.nCopies(12, 0));

        for (Weight weight : weights) {
            int teamIndex = weight.getTeam().getId().intValue() - 1;
            totalWeights.set(teamIndex, totalWeights.get(teamIndex) + weight.getWeightValue());
            log.info("totalWeights: {}", totalWeights);
        }

        return new ArrayList<>(totalWeights);
    }

    private int findRecommendedTeamIndex(List<Integer> totalWeights) {
        int maxWeight = Collections.max(totalWeights);
        return totalWeights.indexOf(maxWeight);
    }



    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private QuestionService questionService;

    // 설문 시작 로직 구현

    @Override
    public SurveyDTO getSurveyById(Long surveyId) {
        Optional<Survey> surveyOptional = surveyRepository.findById(surveyId);
        if (surveyOptional.isPresent()) {
            Survey survey = surveyOptional.get();
            SurveyDTO surveyDTO = new SurveyDTO();
            surveyDTO.setSurveyId(survey.getSurveyId());
            surveyDTO.setSurveyName(survey.getSurveyName());
//            surveyDTO.setQuestions(questionService.getQuestionsBySurveyId(surveyId));
            return surveyDTO;
        }
        return null;
    }


}
