package com.KL1verse.Survey.survey.repository;

import com.KL1verse.Survey.survey.repository.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    }




