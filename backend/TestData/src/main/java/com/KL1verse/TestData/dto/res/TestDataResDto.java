package com.KL1verse.TestData.dto.res;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TestDataResDto {

    private Integer timelineId;
    private String playerName;
    private String playerName2;
    private String teamName;
    private Integer teamId;
    private Integer backNo;
    private Integer timeMin;
    private String eventName;
    private String homeOrAway;
}
