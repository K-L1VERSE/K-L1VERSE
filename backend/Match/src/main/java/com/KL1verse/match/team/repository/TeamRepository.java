package com.KL1verse.match.team.repository;

import com.KL1verse.match.team.repository.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Member, Integer> {
    List<Member> findByTeam_id(int team_id);

}
