package com.KL1verse.match.team.repository;

import com.KL1verse.match.team.repository.entity.Member;
import com.KL1verse.match.team.repository.entity.Team;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team findByTeamId (int teamId);

}
