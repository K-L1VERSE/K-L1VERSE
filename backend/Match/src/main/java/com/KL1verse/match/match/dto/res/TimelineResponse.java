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
public class TimelineResponse {
    private Integer timelineId;
    private String playerName;
    private String playerName2;
    private Integer backNo;
    private String teamName;
    private Integer teamId;
    private String eventName;
    private Integer timeMin;
    private String homeOrAway;
}
