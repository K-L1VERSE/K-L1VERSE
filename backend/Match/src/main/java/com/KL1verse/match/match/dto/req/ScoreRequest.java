package com.KL1verse.match.match.dto.req;

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
public class ScoreRequest {

    private String leagueId = "1";
    private String month;
//    private String teamId;
    private String ticketYn = "";
    private String year;

}
