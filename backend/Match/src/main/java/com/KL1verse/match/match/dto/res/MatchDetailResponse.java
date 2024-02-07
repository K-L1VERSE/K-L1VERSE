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
public class MatchDetailResponse {

    private int homeTeamId;
    private int awayTeamId;
    private String homeTeamName;
    private String awayTeamName;
    private int homeBettingAmount;
    private int awayBettingAmount;
    private int drawBettingAmount;
    private LocalDateTime matchAt;
    private String status;
    private int homeScore;
    private int awayScore;
    private String home;

}
