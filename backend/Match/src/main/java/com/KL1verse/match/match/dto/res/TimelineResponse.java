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
    private int timelineId;
    private String memberName;
    private String memberName2;
    private int backNo;
    private String teamName;
    private String eventName;
    private int timeMin;
    private String homeOrAway;

}
