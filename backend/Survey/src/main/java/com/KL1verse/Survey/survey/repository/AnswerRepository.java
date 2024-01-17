package com.KL1verse.Survey.survey.repository;

import com.KL1verse.Survey.survey.repository.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    }



