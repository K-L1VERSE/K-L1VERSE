package com.KL1verse.match.match.dto.res;

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
public class MatchListResponse {

    private int matchId;
    private String homeTeamName;
    private String awayTeamName;
    private String matchAt;
    private int homeScore;
    private int awayScore;

}
