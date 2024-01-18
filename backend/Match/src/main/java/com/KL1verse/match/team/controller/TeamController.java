package com.KL1verse.match.team.controller;

import com.KL1verse.match.team.dto.res.TeamInfoResponse;
import com.KL1verse.match.team.service.TeamService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/{id}")
    public ResponseEntity<TeamInfoResponse> getTeamInfo(@PathVariable final int id) {
        TeamInfoResponse teamInfo = teamService.getTeamInfo(id);
        return new ResponseEntity<>(teamInfo, HttpStatus.OK);
    }

}
