package com.KL1verse.Crawl.domain.news.service;

import com.KL1verse.Crawl.global.RandomUserAgent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class NewsCrawl {

    @Getter
    @AllArgsConstructor
    public static class teamInfo {
        private String teamCode;
        private String teamName;
    }

    private final RestTemplate restTemplate = new RestTemplate();
    private final List<teamInfo> teamInfoList = List.of(
            new teamInfo("01", "울산 HD"), new teamInfo("03", "포항 스틸러스"),
            new teamInfo("04", "제주 유나이티드"), new teamInfo("05", "전북 현대 모터스"),
            new teamInfo("09", "FC 서울"), new teamInfo("10", "대전 하나 시티즌"),
            new teamInfo("17", "대구 FC"), new teamInfo("18", "인천 유나이티드"),
            new teamInfo("21", "강원 FC"), new teamInfo("22", "광주 FC"),
            new teamInfo("29", "수원 FC"), new teamInfo("35", "김천 상무"));

    //    @Scheduled(cron = "0/5 * * * * *")
    @Scheduled(fixedDelay = Long.MAX_VALUE)
    public void crawlNews() {
        log.info("Crawling...");


        teamInfoList.forEach(teamInfo -> {
            if (teamInfo.getTeamCode().equals("35")) {
                /*
                 * 현재 김천 상무에 관한 뉴스는 없음
                 * 이번에 승격하여 참가하는 팀이여서 그런듯?
                 */
                return;
            }
            log.info("Crawling K리그1 {} 뉴스...", teamInfo.getTeamName());
            CrawlNewsTeam(teamInfo.getTeamCode());
        });
    }

    private void CrawlNewsTeam(String teamCode) {
        String newsListUrl = "https://m.sports.naver.com/team/news?category=kleague&teamCode=";
        processCrawling(newsListUrl + teamCode);
    }

    private HttpHeaders createHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", RandomUserAgent.getRandomUserAgent());
        return headers;
    }

    private String sendHttpRequest(String url) {
        HttpEntity<String> entity = new HttpEntity<>(createHttpHeaders());
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        while (response.getBody() == null) {
            log.info("response.getBody() is null. Retry...");
            response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        }
        return response.getBody();
    }

    private Element getScriptElement(String html) {
        Document document = Jsoup.parse(html);
        return document.select("script[type=text/javascript]").stream()
                .filter(element -> element.html().contains("newsDrawer.draw("))
                .findFirst()
                .orElse(null);
    }

    private List<String> parseNewsList(String newsListJsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode newsListJsonNode = null;
        try {
            newsListJsonNode = objectMapper.readTree(newsListJsonString).get("newsList");
//            log.info("newsListJsonNode: {}", newsListJsonNode);

            List<String> newsContentList = new ArrayList<>();
            for (JsonNode newsNode : newsListJsonNode) {
                String date = newsNode.get("date").asText();
                String time = newsNode.get("time").asText();
                String newsDateTime = "20" + date + " " + time;

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd. HH:mm");
                LocalDateTime newsLocalDateTime = LocalDateTime.parse(newsDateTime, formatter);

                long minutesDifference = Duration.between(newsLocalDateTime, LocalDateTime.now()).toMinutes();
                if (minutesDifference > 4000) {
                    // 4000분 이상 차이나면 뉴스 내용을 가져오지 않음

                    break;
                }

                String oid = newsNode.get("oid").asText();
                String aid = newsNode.get("aid").asText();

                // 뽑아낸 정보를 이용하여 뉴스 상세 내용 가져오기
                newsContentList.add(getNewsContent(oid, aid));
            }
            return newsContentList;

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private String getNewsContent(String oid, String aid) {
        String newsDetailUrl = "https://sports.news.naver.com/news?oid=" + oid + "&aid=" + aid;

        String response = sendHttpRequest(newsDetailUrl);

        // Jsoup을 이용하여 HTML 파싱
        Document document = Jsoup.parse(response);

        // 특정 ID를 가진 div 요소 선택
        Element contentDiv = document.getElementById("newsEndContents");
        String newsContent = contentDiv.ownText();
        log.info("newsContent: {}", newsContent);

        return newsContent;
    }

    private void processCrawling(String url) {
        /*
        * Url로 Http GET 요청을 보내고, 응답을 받아온다.
        */
        String response = sendHttpRequest(url);

        /*
        * 받은 응답으로부터 script 태그를 가진 요소를 가져온다.
        */
        Element scriptElement = getScriptElement(response);
//        log.info("scriptElement: {}", scriptElement.html());
        if(scriptElement != null) {
            /*
            * script 태그 안에 있는 뉴스 리스트 정보를 가져온다.
            */
            String scriptContent = scriptElement.html();
            int startIndex = scriptContent.indexOf("newsDrawer.draw(");
            int endIndex = scriptContent.indexOf(");", startIndex);
            String newsListJsonString = scriptContent.substring(startIndex + "newsDrawer.draw(".length(), endIndex);
//            log.info("newsListJsonString: {}", newsListJsonString);

            /*
            * 뉴스 리스트 정보를 이용하여 뉴스 상세 내용을 가져온다.
            */
            List<String> newsContentList = parseNewsList(newsListJsonString);

            /*
            * Todo... 가져온 뉴스 내용을 OpenAI API를 이용하여 긍정 부정 판단받기.
            * 긍정이라고 판단될 시 DB에 저장
            * 해당 팀 뱃지를 착용하고 있는 유저들에게 알림을 보내기 위해 User 서버로 Kafka 메시지 전송.
            */
        }
    }
}
