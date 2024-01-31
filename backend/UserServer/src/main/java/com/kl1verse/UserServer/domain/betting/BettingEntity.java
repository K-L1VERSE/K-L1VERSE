package com.kl1verse.UserServer.domain.betting;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
@Entity(name = "betting")
public class BettingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "betting_id")
    private Integer bettingId;

    @Column(name = "match_id")
    private Integer matchId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "betting_team_id")
    private Integer bettingTeamId;

    @Column(name = "amount")
    private Integer amount;

}
