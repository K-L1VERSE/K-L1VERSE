package com.KL1verse.Survey.survey.repository;

import com.KL1verse.Survey.survey.repository.entity.Weight;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {
        List<List<Integer>> findWeightsByAnswerIds(List<Integer> answerIds);
}


