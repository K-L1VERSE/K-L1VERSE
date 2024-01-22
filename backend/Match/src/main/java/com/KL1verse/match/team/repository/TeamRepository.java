package com.KL1verse.match.team.repository;

import com.KL1verse.match.team.repository.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

    // team 정보 가져오기
    Team findByTeamId (Integer teamId);

}
