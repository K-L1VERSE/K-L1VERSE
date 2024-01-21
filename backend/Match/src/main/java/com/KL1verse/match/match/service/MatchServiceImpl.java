package com.KL1verse.match.match.service;

import com.KL1verse.match.match.dto.req.ScoreRequest;
import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;

    @Override
    public List<MatchListResponse> getMatchList(int month) throws JsonProcessingException {

        List<Match> matchList = matchRepository.findByMonth(month);
        List<MatchListResponse> matchListResponses = new ArrayList<>();

        for(Match match : matchList) {
            matchListResponses.add(MatchListResponse.builder()
                .homeTeamName(matchRepository.findOneByTeamId(match.getHomeTeamId()))
                .awayTeamName(matchRepository.findOneByTeamId(match.getAwayTeamId()))
                .matchAt(match.getMatchAt())
                .homeScore(match.getHomeScore())
                .awayScore(match.getAwayScore())
                .build());
        }

        ScoreRequest scoreRequest = ScoreRequest.builder()
            .leagueId("1")
            .month("12")
            .year("2023")
            .build();

        getScore("https://www.kleague.com/getScheduleList.do", scoreRequest);

        return matchListResponses;
    }

    @Override
    public MatchDetailResponse getMatchDetail(int matchId) {

        Match match = matchRepository.findByMatchId(matchId).orElse(null);

        return MatchDetailResponse.builder()
            .homeTeamId(match.getHomeTeamId())
            .awayTeamId(match.getAwayTeamId())
            .homeTeamName(matchRepository.findOneByTeamId(match.getHomeTeamId()))
            .awayTeamName(matchRepository.findOneByTeamId(match.getAwayTeamId()))
            .homeBettingAmount(match.getHomeBettingAmount())
            .awayBettingAmount(match.getAwayBettingAmount())
            .matchAt(match.getMatchAt())
            .status(match.getStatus())
            .homeScore(match.getHomeScore())
            .awayScore(match.getAwayScore())
            .build();
    }

    @Override
    public void getScore(String url, Object data, int month, int day, int hour, int minute)
        throws JsonProcessingException {

        // 해당 날짜, 시간의 매치 가져오기
//        Match match = matchRepository.findByMatch~~;

        // 스코어 가져오기
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> entity = new HttpEntity<>(data, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        // json 변환
        JsonElement jsonElement = JsonParser.parseString(response.getBody());
        JsonArray asJsonArray = jsonElement.getAsJsonObject().get("data").getAsJsonObject()
            .get("scheduleList").getAsJsonArray();

        // 해당 매치의 스코어일 경우 다른지 비교해서 갱신
        for (JsonElement element : asJsonArray) {
            System.out.println(element.getAsJsonObject());
        }


    }

}
