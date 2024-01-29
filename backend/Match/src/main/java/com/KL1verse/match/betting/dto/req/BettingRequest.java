package com.KL1verse.match.betting.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BettingRequest {

    private int userId;
    private int matchId;
    private int bettingTeamId;
    private int amount;

}
