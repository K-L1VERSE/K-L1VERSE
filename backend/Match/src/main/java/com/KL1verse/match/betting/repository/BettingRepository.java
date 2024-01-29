package com.KL1verse.match.betting.repository;

import com.KL1verse.match.betting.repository.entity.Betting;
import java.util.List;
import java.util.Optional;
import javax.swing.text.html.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BettingRepository extends JpaRepository<Betting, Integer> {

    @Query(value = "SELECT * FROM betting WHERE match_id = :matchId AND betting_team_id = :winningTeamId", nativeQuery = true)
    List<Betting> findByMatchIdAndBettingTeamId(@Param("matchId")int matchId,@Param("winningTeamId") int winningTeamId);

    Optional<Betting> findByUserIdAndMatchId(int bettingId, int matchId);

    List<Betting> findByMatchId(int matchId);
}
