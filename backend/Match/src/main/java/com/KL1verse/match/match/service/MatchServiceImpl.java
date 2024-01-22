package com.KL1verse.match.match.service;

import com.KL1verse.match.match.dto.req.ScoreRequest;
import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;

    @Override
    public List<MatchListResponse> getMatchList(int month) {

        List<Match> matchList = matchRepository.findByMonth(month);
        List<MatchListResponse> matchListResponses = new ArrayList<>();

        for(Match match : matchList) {
            // 현재 시간이랑 매치 시간이랑 비교해서 일치하면 status upcoming -> during으로 변경
            // status가 during일 경우 getScore 함수 실행
            getScore(match);

            matchListResponses.add(MatchListResponse.builder()
                .homeTeamName(matchRepository.findOneByTeamId(match.getHomeTeamId()))
                .awayTeamName(matchRepository.findOneByTeamId(match.getAwayTeamId()))
                .matchAt(match.getMatchAt())
                .homeScore(match.getHomeScore())
                .awayScore(match.getAwayScore())
                .build());
        }

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
    @Transactional
    public void getScore(Match match) {

        // match 년, 월, 일 가져오기
        int matchYear = match.getMatchAt().getYear();
        int matchMonth = match.getMatchAt().getMonthValue();
        int matchDay = match.getMatchAt().getDayOfMonth();

        // 경기 스케줄 리스트 가져오기
        String url = "https://www.kleague.com/getScheduleList.do";
        Object data  = ScoreRequest.builder()
            .month(String.valueOf(matchMonth))
            .year(String.valueOf(matchYear))
            .build();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> entity = new HttpEntity<>(data, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        // json 변환
        JsonElement jsonElement = JsonParser.parseString(response.getBody());
        JsonArray asJsonArray = jsonElement.getAsJsonObject().get("data").getAsJsonObject()
            .get("scheduleList").getAsJsonArray();

        for (JsonElement element : asJsonArray) {
            // 경기 종료 y 오면 status during -> done 으로 변경


            // day, homeTeamName, awayTeamName 으로 해당 match 가져오기
            String gameDate = element.getAsJsonObject().getAsJsonObject("gameDate").getAsString();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
            LocalDate date = LocalDate.parse(gameDate, formatter);
            int gameDay = date.getDayOfMonth();
            String gameHomeTeamName = element.getAsJsonObject().getAsJsonObject("homeTeamName").getAsString();
            String gameAwayTeamName = element.getAsJsonObject().getAsJsonObject("awayTeamName").getAsString();

            String matchHomeTeamName = matchRepository.findOneByTeamId(match.getHomeTeamId());
            String matchAwayTeamName = matchRepository.findOneByTeamId(match.getAwayTeamId());

            if (matchDay == gameDay && matchHomeTeamName.equals(gameHomeTeamName) && matchAwayTeamName.equals(gameAwayTeamName)) {
                // 경기의 gameId, meetSeq 가져오기
                int gameId = element.getAsJsonObject().getAsJsonObject("gameId").getAsInt();
                int meetSeq = element.getAsJsonObject().getAsJsonObject("meetSeq").getAsInt();
                getTimeline(matchYear, gameId, meetSeq);

                // 스코어 다를 경우 갱신
                int homeGoal = element.getAsJsonObject().getAsJsonObject("homeGoal").getAsInt();
                int awayGoal = element.getAsJsonObject().getAsJsonObject("awayGoal").getAsInt();
                if (match.getHomeScore() != homeGoal || match.getAwayScore() != awayGoal) {
                    match.setHomeScore(homeGoal);
                    match.setAwayScore(awayGoal);
                }
                break;
            }



        }

    }

    @Override
    public void getTimeline(int matchYear, int gameId, int meetSeq) {
        String url = "https://www.kleague.com/api/match/timeline.do";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, Integer> map= new LinkedMultiValueMap<String, Integer>();
        map.add("year", matchYear);
        map.add("leagueId", 1);
        map.add("gameId", gameId);
        map.add("meetSeq", meetSeq);

        HttpEntity<MultiValueMap<String, Integer>> request = new HttpEntity<MultiValueMap<String, Integer>>(map, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        System.out.println(response.getBody());

        // json 변환
        JsonElement jsonElement = JsonParser.parseString(response.getBody());
        JsonArray asJsonArray = jsonElement.getAsJsonObject().get("data").getAsJsonObject()
            .get("firstHalf").getAsJsonArray();



    }


}
