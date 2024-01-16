package com.kl1verse.UserServer.domain.oauth.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final Environment env;

    /*
    * Google 승인 서버로 HTTP 요청을 보내기 위한 RestTemplate
    * */
    private final RestTemplate restTemplate = new RestTemplate();

    /*
    *
    * */
    @Override
    public void socialLogin(String code, String registrationId) {
        String accessToken = getAccessToken(code, registrationId);
        JsonNode userResourceNode = getUserResource(accessToken, registrationId);
        System.out.println("userResourceNode = " + userResourceNode);

        String id = userResourceNode.get("id").asText();
        String email = userResourceNode.get("email").asText();
        String name = userResourceNode.get("name").asText();
        String profile = userResourceNode.get("picture").asText();
        log.info("id = {}", id);
        log.info("email = {}", email);
        log.info("name = {}", name);
        log.info("profile = {}", profile);
    }

    /*
    * 응답받은 Authorization Code를 이용하여 OAuth access token을 발급받는 메소드
    * RestTemplate을 이용하여 토큰 요청
    * */
    private String getAccessToken(String authorizationCode, String registrationId) {
        String clientId = env.getProperty("oauth." + registrationId + ".client-id");
        String clientSecret = env.getProperty("oauth." + registrationId + ".client-secret");
        String redirectUri = env.getProperty("oauth." + registrationId + ".redirect-uri");
        String tokenUri = env.getProperty("oauth." + registrationId + ".token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        log.info("response = {}", accessTokenNode);
        log.info("refreshtoken = {}", accessTokenNode.get("refresh_token"));
        return accessTokenNode.get("access_token").asText();
    }

    private JsonNode getUserResource(String accessToken, String registrationId) {
        String resourceUri = env.getProperty("oauth."+registrationId+".resource-uri");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
    }
}
