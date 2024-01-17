package com.KL1verse.Survey.survey.service;

import com.KL1verse.Survey.survey.repository.AnswerRepository;
import com.KL1verse.Survey.survey.repository.TeamRepository;
import com.KL1verse.Survey.survey.repository.WeightRepository;
import com.KL1verse.Survey.survey.repository.entity.Team;
import com.KL1verse.Survey.survey.repository.entity.Weight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SurveyServiceImpl implements SurveyService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private WeightRepository weightRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public String recommendTeam(List<Integer> userSelection) {
        // AnswerId로 전송된 질문 id들에 대한 가중치를 가져옴
        List<Integer> weights = getWeightsByAnswerIds(userSelection);

        // 가중치를 계산하고 가장 높은 가중치를 가진 팀을 추천
        Team recommendedTeam = calculateAndRecommendTeam(weights);

        return recommendedTeam.getTeamName();
    }

    private List<Integer> getWeightsByAnswerIds(List<Integer> answerIds) {
        List<List<Integer>> weights = weightRepository.findWeightsByAnswerIds(answerIds);

        // weights 리스트를 평탄화?하여 가중치들을 더한 리스트 반환
        return calculateTotalWeights(weights);
        // weights의 구조 예시:
        // weights = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        // 첫 번째 답변에 대한 가중치: [1, 2, 3]
        // 두 번째 답변에 대한 가중치: [4, 5, 6]
        // 세 번째 답변에 대한 가중치: [7, 8, 9]
    }

    private List<Integer> calculateTotalWeights(List<List<Integer>> weights) {
        List<Integer> totalWeights = new ArrayList<>(Collections.nCopies(12, 0));
        // 크기가 12이고 초기값이 모두 0인 정수형 리스트를 생성하는 코드입니다.

        for (List<Integer> weight : weights) {
            for (int i = 0; i < totalWeights.size(); i++) {
                totalWeights.set(i, totalWeights.get(i) + weight.get(i));
                // totalWeights 리스트의 각 인덱스에 해당하는 값들이 weight 객체에서 가져온 가중치 리스트의 값들을 더한 결과로 업데이트
            }
        }

        return totalWeights;
    }



    private Team calculateAndRecommendTeam(List<Integer> weights) {
        List<Team> teams = teamRepository.findAll();

        int maxWeight = Integer.MIN_VALUE;
        Team recommendedTeam = null;

        for (int i = 0; i < teams.size(); i++) {
            int teamWeight = calculateTeamWeight(weights, i);
            if (teamWeight > maxWeight) {
                maxWeight = teamWeight;
                recommendedTeam = teams.get(i);
            }
        }

        return recommendedTeam;
    }

    private int calculateTeamWeight(List<Integer> weights, int teamIndex) {
        int teamWeight = 0;
        List<Team> teams = teamRepository.findAll();

        for (int i = 0; i < weights.size(); i++) {
            teamWeight += weights.get(i) * teams.get(teamIndex).getTeamWeights().get(i);
        }

        return teamWeight;
    }
}
