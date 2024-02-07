package com.KL1verse.match.team.dto.res;

import com.KL1verse.match.team.repository.entity.Member;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TeamInfoResponse {

    private int teamId;
    private String teamName;
    private String description;
    private String homepage;
    private String facebook;
    private String instagram;
    private String youtube;
    private String song;
    private List<Member> members;


}