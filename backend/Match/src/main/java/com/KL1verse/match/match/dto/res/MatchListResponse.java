package com.KL1verse.match.match.dto.res;

import java.time.LocalDateTime;
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
    private int homeTeamId;
    private int awayTeamId;
    private String homeTeamName;
    private String awayTeamName;
    private LocalDateTime matchAt;
    private int homeScore;
    private int awayScore;
    private String status;

}
