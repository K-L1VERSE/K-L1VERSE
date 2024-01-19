package com.KL1verse.match.team.service;


import com.KL1verse.match.team.dto.res.TeamInfoResponse;
import com.KL1verse.match.team.repository.MemberRepository;
import com.KL1verse.match.team.repository.TeamRepository;
import com.KL1verse.match.team.repository.entity.Member;
import com.KL1verse.match.team.repository.entity.Team;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;

    @Override
    public TeamInfoResponse getTeamInfo(int id) {
        Team team = teamRepository.findByTeamId(id);
        List<Member> member = memberRepository.findByTeamId(id);

        return TeamInfoResponse.builder()
            .teamId(team.getTeamId())
            .teamName(team.getTeamName())
            .description(team.getTeamDescription())
            .members(member)
            .build();

    }
}
