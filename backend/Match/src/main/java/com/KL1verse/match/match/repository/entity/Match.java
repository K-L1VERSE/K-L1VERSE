package com.KL1verse.match.match.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
public class Match {

    @Id
    @Column(name = "match_id")
    private int matchId;

    @Column(name = "match_at")
    private String matchAt;

    @Column(name = "home_team_id")
    private int homeTeamId;

    @Column(name = "away_team_id")
    private int awayTeamId;

    @Column(name = "home")
    private String home;

    @Column(name = "status")
    private String status;

    @Column(name = "home_score")
    private int homeScore;

    @Column(name = "away_score")
    private int awayScore;

    @Column(name = "home_betting_amount")
    private int homeBettingAmount;

    @Column(name = "away_betting_amount")
    private int awayBettingAmount;

}
