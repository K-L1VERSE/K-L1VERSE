package com.KL1verse.match.match.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.*;
import jakarta.persistence.*;
import lombok.Builder.Default;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
@DynamicUpdate
@Entity(name = "game") // mysql에서 match가 예약어라서 game으로 바꿈
public class Match {

    public enum MatchStatus {
        upcoming, during, done
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "match_id")
    private int matchId;

    @NotNull
    @Column(name = "match_at")
    private LocalDateTime matchAt;

    @NotNull
    @Column(name = "home_team_id")
    private int homeTeamId;

    @NotNull
    @Column(name = "away_team_id")
    private int awayTeamId;

    @NotNull
    @Column(name = "home")
    private String home;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'upcoming'")
    @Column(name = "status")
    private MatchStatus status;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "home_score")
    private int homeScore;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "away_score")
    private int awayScore;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "home_betting_amount")
    private int homeBettingAmount;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "away_betting_amount")
    private int awayBettingAmount;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "draw_betting_amount")
    private int drawBettingAmount;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "goal_divided")
    private Boolean goalDivided;

}
