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

    @Query(value = "SELECT team_name FROM team WHERE team_id = :teamId", nativeQuery = true)
    String findOneByTeamId(@Param("teamId") int teamId);

    @Query(value = "SELECT * FROM game WHERE YEAR(match_at) = :year and MONTH(match_at) = :monthValue and DAY(match_at) = :dayOfMonth", nativeQuery = true)
    List<Match> findByDate(int year, int monthValue, int dayOfMonth);

    @Query(value="UPDATE game SET home_betting_amount = :homeBettingAmount WHERE match_id = :matchId", nativeQuery = true)
    void updateHomeBettingAmount(@Param("matchId") int matchId, @Param("homeBettingAmount") int homeBettingAmount);

    @Query(value="UPDATE game SET away_betting_amount = :awayBettingAmount WHERE match_id = :matchId", nativeQuery = true)
    void updateAwayBettingAmount(@Param("matchId") int matchId, @Param("awayBettingAmount") int awayBettingAmount);

    @Query(value="UPDATE game SET draw_betting_amount = :drawBettingAmount WHERE match_id = :matchId", nativeQuery = true)
    void updateDrawBettingAmount(@Param("matchId") int matchId, @Param("drawBettingAmount") int drawBettingAmount);

    @Query(value="UPDATE game SET goal_divided = :bool WHERE match_id = :matchId", nativeQuery = true)
    void updateGoalDivided(@Param("matchId")int matchId,@Param("bool") int bool);
}
