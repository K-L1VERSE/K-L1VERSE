package com.KL1verse.match.match.service;

import com.KL1verse.match.match.dto.req.ScoreRequest;
import com.KL1verse.match.match.dto.res.MatchDetailResponse;
import com.KL1verse.match.match.dto.res.MatchListResponse;
import com.KL1verse.match.match.dto.res.TimelineResponse;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.TimelineRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.KL1verse.match.match.repository.entity.Timeline;
import com.google.gson.*;
import java.time.LocalDateTime;
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
    private final TimelineRepository timelineRepository;

    @Override
    @Transactional
    public List<MatchListResponse> getMatchList(int month) {

        List<Match> matchList = matchRepository.findByMonth(month);
        List<MatchListResponse> matchListResponses = new ArrayList<>();

        for(Match match : matchList) {
            // 현재 시간이랑 매치 시간이랑 비교해서 일치하면 status upcoming -> during으로 변경
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime matchAt = match.getMatchAt();
            if (now.getYear() == matchAt.getYear() && now.getMonthValue() == matchAt.getMonthValue() && now.getDayOfMonth() == matchAt.getDayOfMonth() && now.getHour() == matchAt.getHour()) {
                match.setStatus("during");
            }

            // status가 during일 경우 getScore 함수 실행
            if (match.getStatus().equals("during")) {
                getScore(match);
            }

            matchListResponses.add(MatchListResponse.builder()
                .matchId(match.getMatchId())
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

        Match match = matchRepository.findById(matchId).orElse(null);

        // 현재 시간이랑 매치 시간이랑 비교해서 일치하면 status upcoming -> during으로 변경
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime matchAt = match.getMatchAt();
        if (now.getYear() == matchAt.getYear() && now.getMonthValue() == matchAt.getMonthValue() && now.getDayOfMonth() == matchAt.getDayOfMonth() && now.getHour() == matchAt.getHour()) {
            match.setStatus("during");
        }

        // status가 during일 경우 getScore 함수 실행
        if (match.getStatus().equals("during")) {
            getScore(match);
        }

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
                // 경기 종료되면 status during -> done 으로 변경
                if (element.getAsJsonObject().getAsJsonObject("endYn").getAsString().equals("Y")) {
                    match.setStatus("done");
                    break;
                }
                // 경기 gameId, meetSeq -> 타임라인 갱신
                int gameId = element.getAsJsonObject().getAsJsonObject("gameId").getAsInt();
                int meetSeq = element.getAsJsonObject().getAsJsonObject("meetSeq").getAsInt();
                saveTimeline(matchYear, gameId, meetSeq, match.getMatchId());

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
    @Transactional
    public void saveTimeline(int matchYear, int gameId, int meetSeq, int matchId) {
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

        int matchCnt = matchRepository.countById(matchId);
        if (matchCnt <  asJsonArray.size()) {
            for (int i = 0; i < asJsonArray.size() - matchCnt; i++) {
                JsonObject timelineItem = asJsonArray.get(matchCnt + i).getAsJsonObject();
                Timeline timeline = Timeline.builder()
                    .matchId(matchId)
                    .memberName(timelineItem.getAsJsonObject("playerName").getAsString())
                    .teamName(timelineItem.getAsJsonObject("teamName").getAsString())
                    .backNo(timelineItem.getAsJsonObject("backNo").getAsInt())
                    .timeMin(timelineItem.getAsJsonObject("timeMin").getAsInt())
                    .eventName(timelineItem.getAsJsonObject("eventName").getAsString())
                    .homeOrAway(timelineItem.getAsJsonObject("homeOrAway").getAsString())
                    .build();

                timelineRepository.save(timeline);

            }
        }

    }

    @Override
    public List<TimelineResponse> getTimeline(int matchId) {
        List<Timeline> timeline = timelineRepository.findByMatchId(matchId);
        List<TimelineResponse> timelineResponse = new ArrayList<>();
        for (Timeline timelineItem : timeline) {
            timelineResponse.add(TimelineResponse.builder()
                .timelineId(timelineItem.getTimelineId())
                .teamName(timelineItem.getTeamName())
                .memberName(timelineItem.getMemberName())
                .backNo(timelineItem.getBackNo())
                .eventName(timelineItem.getEventName())
                .timeMin(timelineItem.getTimeMin())
                .homeOrAway(timelineItem.getHomeOrAway())
                .build());

        }
        return timelineResponse;
    }



    @Override
    public List<MatchListResponse> getTodayMatchList() {
        LocalDateTime now = LocalDateTime.now();
        List<Match> matchList = matchRepository.findByDate(now.getYear(), now.getMonthValue(), now.getDayOfMonth());
        List<MatchListResponse> matchListResponse = new ArrayList<>();

        for (Match match : matchList) {
            matchListResponse.add(MatchListResponse.builder()
                .matchId(match.getMatchId())
                .homeTeamName(matchRepository.findOneByTeamId(match.getHomeTeamId()))
                .awayTeamName(matchRepository.findOneByTeamId(match.getAwayTeamId()))
                .matchAt(match.getMatchAt())
                .homeScore(match.getHomeScore())
                .awayScore(match.getAwayScore())
                .build());
        }
        return matchListResponse;
    }
}
