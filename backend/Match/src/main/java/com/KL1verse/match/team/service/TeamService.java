package com.KL1verse.match.team.service;


import com.KL1verse.match.team.dto.res.TeamInfoResponse;
import com.KL1verse.match.team.repository.entity.Member;
import java.util.List;

public interface TeamService {

    TeamInfoResponse getTeamInfo(int id);
}
