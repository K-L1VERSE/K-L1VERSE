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
        // 12개의 팀에 대한 총 가중치를 저장하는 리스트를 생성하고 초기화 (모든 값은 0)
        List<Integer> totalWeights = new ArrayList<>(Collections.nCopies(12, 0));

        for (Weight weight : weights) {
            // Weight에 연결된 팀의 인덱스를 계산 (인덱스는 0부터 시작하므로 1을 빼줌)
            int teamIndex = weight.getTeam().getId().intValue() - 1;
            // 해당 팀의 총 가중치에 현재 Weight의 가중치를 더함
            totalWeights.set(teamIndex, totalWeights.get(teamIndex) + weight.getWeightValue());
            log.info("totalWeights: {}", totalWeights);
        }

        return new ArrayList<>(totalWeights);
    }

    private int findRecommendedTeamIndex(List<Integer> totalWeights) {
        // 총 가중치 목록에서 최대 가중치를 찾음
        int maxWeight = Collections.max(totalWeights);
        // 최대 가중치를 가진 팀의 인덱스를 반환
        return totalWeights.indexOf(maxWeight);
    }



    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private QuestionService questionService;

    // 설문 시작 로직 구현

    @Override
    public SurveyDTO getSurveyById(Long surveyId) {
        // 주어진 surveyId를 사용하여 SurveyRepository에서 설문 정보를 조회
        Optional<Survey> surveyOptional = surveyRepository.findById(surveyId);
        if (surveyOptional.isPresent()) {
            // Optional에서 실제 Survey 객체를 가져옴
            Survey survey = surveyOptional.get();

            // SurveyDTO 객체를 생성하여 Survey 객체의 일부 정보를 복사
            SurveyDTO surveyDTO = new SurveyDTO();
            surveyDTO.setSurveyId(survey.getSurveyId());
            surveyDTO.setSurveyName(survey.getSurveyName());
//            surveyDTO.setQuestions(questionService.getQuestionsBySurveyId(surveyId));
            return surveyDTO;
        }
        return null;
    }


}