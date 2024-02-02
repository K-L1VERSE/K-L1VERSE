package com.KL1verse.match.team.repository;

import com.KL1verse.match.team.repository.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

    // team 정보 가져오기
    Team findByTeamId (Integer teamId);

    @Query(value = "SELECT uri FROM song WHERE song_id = :songId", nativeQuery = true)
    String findBySongId (@Param("songId") int songId);

}
