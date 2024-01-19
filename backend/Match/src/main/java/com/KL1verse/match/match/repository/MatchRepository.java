package com.KL1verse.match.match.repository;

import com.KL1verse.match.match.repository.entity.Match;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<Match, Integer> {
    @Query(value = "SELECT * FROM match WHERE MONTH(match_at) = :month", nativeQuery = true)
    List<Match> findByMonth(int month);

    Optional<Match> findByMatchId(int matchId);

    String findOneByTeamId(int teamId);
}
