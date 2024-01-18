package com.KL1verse.Survey.survey.service;

import com.KL1verse.Survey.survey.repository.WeightRepository;
import com.KL1verse.Survey.survey.repository.entity.Weight;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class SurveyServiceImpl implements SurveyService {

    @Autowired
    private WeightRepository weightRepository;

    @Override
    public int recommendTeam(List<Long> userSelection) {
        List<Weight> weights = new ArrayList<>();
        for (long answerId : userSelection) {
            weights.addAll(weightRepository.findByAnswerId(answerId));
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
}
