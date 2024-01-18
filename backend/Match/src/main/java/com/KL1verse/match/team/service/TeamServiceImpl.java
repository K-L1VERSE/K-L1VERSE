package com.KL1verse.match.team.service;


import com.KL1verse.match.team.dto.res.TeamInfoResponse;
import com.KL1verse.match.team.repository.TeamRepository;
import com.KL1verse.match.team.repository.entity.Member;
import com.KL1verse.match.team.repository.entity.Team;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    @Autowired
    TeamRepository teamRepository;

    @Override
    public TeamInfoResponse getTeamInfo(int id) {
        Team team = teamRepository.findByTeamId(id);
        return TeamInfoResponse.builder()
            .teamId(team.getTeamId())
            .teamName(team.getTeamName())
            .description(team.getTeamDescription())
            .members(team.getMember())
            .build();
    }
}
