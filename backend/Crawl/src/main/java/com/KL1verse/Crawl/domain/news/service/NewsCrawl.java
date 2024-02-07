package com.KL1verse.Crawl.domain.news.service;

import com.KL1verse.Crawl.domain.kafka.dto.producer.KafkaNewsNotificationProducer;
import com.KL1verse.Crawl.domain.news.dto.res.NewsResDto;
import com.KL1verse.Crawl.domain.openai.service.OpenAiService;
import com.KL1verse.Crawl.global.RandomUserAgent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
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
@RequiredArgsConstructor
public class NewsCrawl {

    private final KafkaNewsNotificationProducer kafkaNewsNotificationProducer;
    private final OpenAiService openAiService;

    @Getter
    @AllArgsConstructor
    public static class TeamInfo {
        private String teamCode;
        private String teamName;
        private String badgeDetialId;
    }

    private final RestTemplate restTemplate = new RestTemplate();
    private final List<TeamInfo> teamInfoList = List.of(
            new TeamInfo("01", "울산 HD", "1"), new TeamInfo("03", "포항 스틸러스", "2"),
            new TeamInfo("04", "제주 유나이티드", "3"), new TeamInfo("05", "전북 현대 모터스", "4"),
            new TeamInfo("09", "FC 서울", "5"), new TeamInfo("10", "대전 하나 시티즌", "6"),
            new TeamInfo("17", "대구 FC", "7"), new TeamInfo("18", "인천 유나이티드", "8"),
            new TeamInfo("21", "강원 FC", "9"), new TeamInfo("22", "광주 FC", "10"),
            new TeamInfo("29", "수원 FC", "11"), new TeamInfo("35", "김천 상무", "12"));

    @Getter
    @AllArgsConstructor
    public static class NewsInfo {

        private String title;
        private String content;
        private String uri;
    }

//        @Scheduled(cron = "0/5 * * * * *")
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
            CrawlNewsTeam(teamInfo);
        });
    }

    private void CrawlNewsTeam(TeamInfo teamInfo) {
        String newsListUrl = "https://m.sports.naver.com/team/news?category=kleague&teamCode=";
        processCrawling(newsListUrl + teamInfo.getTeamCode(), teamInfo.getBadgeDetialId());
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

    private List<NewsInfo> parseNewsList(String newsListJsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode newsListJsonNode = null;
        try {
            newsListJsonNode = objectMapper.readTree(newsListJsonString).get("newsList");
//            log.info("newsListJsonNode: {}", newsListJsonNode);

            List<NewsInfo> newsInfoList = new ArrayList<>();
            for (JsonNode newsNode : newsListJsonNode) {
                String date = newsNode.get("date").asText();
                String time = newsNode.get("time").asText();
                String newsDateTime = "20" + date + " " + time;

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd. HH:mm");
                LocalDateTime newsLocalDateTime = LocalDateTime.parse(newsDateTime, formatter);

                long minutesDifference = Duration.between(newsLocalDateTime, LocalDateTime.now()).toMinutes();
                if (minutesDifference > 600) {
                    // 4000분 이상 차이나면 뉴스 내용을 가져오지 않음

                    break;
                }

                String title = newsNode.get("title").asText();
                String oid = newsNode.get("oid").asText();
                String aid = newsNode.get("aid").asText();

                // 뽑아낸 정보를 이용하여 뉴스 상세 내용 가져오기
                newsInfoList.add(new NewsInfo(title, getNewsContent(oid, aid), "https://sports.news.naver.com/news?oid=" + oid + "&aid=" + aid));
            }
            return newsInfoList;

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private String getNewsContent(String oid, String aid) {
        String newsDetailUrl = "https://sports.news.naver.com/news?oid=" + oid + "&aid=" + aid;
//        String newsDetailUrl = "https://n.news.naver.com/sports/kfootball/artical/" + oid + "/" + aid;

        String response = sendHttpRequest(newsDetailUrl);

        // Jsoup을 이용하여 HTML 파싱
        Document document = Jsoup.parse(response);

        // 특정 ID를 가진 div 요소 선택
        Element contentDiv = document.getElementById("newsEndContents");
        while(contentDiv == null) {
            response = sendHttpRequest(newsDetailUrl);

            // Jsoup을 이용하여 HTML 파싱
            document = Jsoup.parse(response);

            // 특정 ID를 가진 div 요소 선택
            contentDiv = document.getElementById("newsEndContents");
        }
        String newsContent = contentDiv.ownText();
        log.info("newsContent: {}", newsContent);

        return newsContent;
    }

    private void processCrawling(String url, String badgeDetailId) {
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
            List<NewsInfo> newsInfoList = parseNewsList(newsListJsonString);

            /*
            * Todo... 가져온 뉴스 내용을 OpenAI API를 이용하여 긍정 부정 판단받기.
            * 긍정이라고 판단될 시 DB에 저장
            * 해당 팀 뱃지를 착용하고 있는 유저들에게 알림을 보내기 위해 User 서버로 Kafka 메시지 전송.
            */

            NewsResDto newsResDto = new NewsResDto();
            newsResDto.setBadgeDetailId(badgeDetailId);
            List<String> titleList = new ArrayList<>();
            List<String> uriList = new ArrayList<>();

//            for(NewsInfo newsInfo : newsInfoList) {
//                if(newsInfo.content == null) {
//                    continue;
//                }
//
//                log.info("newsContent = {}", newsInfo.content);
//                String prompt = "(예 or 아니오)로 대답해줘. 다음의 뉴스 내용은 긍정적인 내용이야? ("+newsInfo.getContent()+")";
//                String responseFromOpenAIJSon = openAiService.sendRequest(prompt);
//                ObjectMapper objectMapper = new ObjectMapper();
//                try {
//                    JsonNode responseNode = objectMapper.readTree(responseFromOpenAIJSon);
//                    String responseFromOpenAI = responseNode.get("choices").get(0).get("message").get("content").asText();
//                    if(responseFromOpenAI == null || responseFromOpenAI.equals("아니오") || responseFromOpenAI.equals("아니요")) {
//                        continue;
//                    }
//                } catch (JsonProcessingException e) {
//                    e.printStackTrace();
//                }
//                titleList.add(newsInfo.getTitle());
//                uriList.add(newsInfo.getUri());
//            }
            newsResDto.setTitle(titleList);
            newsResDto.setUri(uriList);

            if(!newsResDto.getTitle().isEmpty()) {
                kafkaNewsNotificationProducer.newsNotification(newsResDto);
            }
        }
    }
}
