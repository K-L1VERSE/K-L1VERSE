package com.KL1verse.match.match.repository;

import com.KL1verse.match.match.repository.entity.Match;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<Match, Integer> {
    @Query(value = "SELECT * FROM game WHERE MONTH(match_at) = :month", nativeQuery = true)
    List<Match> findByMonth(@Param("month") int month);

    Optional<Match> findByMatchId(@Param("matchId") int matchId);

    @Query(value = "SELECT team_name FROM team WHERE team_id = :teamId", nativeQuery = true)
    String findOneByTeamId(@Param("teamId") int teamId);

    @Query(value = "SELECT COUNT(t) FROM timeline t WHERE t.match_id = :matchId", nativeQuery = true)
    int countById(@Param("matchId") int matchId);

}
