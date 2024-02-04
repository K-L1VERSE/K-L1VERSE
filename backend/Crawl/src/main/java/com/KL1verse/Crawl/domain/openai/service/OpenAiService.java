package com.KL1verse.Crawl.domain.openai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAiService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openai.api-key}")
    private String apiKey;

    public String sendRequest(String prompt) {

        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        int maxTokens = 3;
        double temperature = 0;


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode messagesNode = objectMapper.createObjectNode();
        messagesNode.put("role", "system").put("content", "너는 뉴스 기사의 감정을 분석하고 탐지하는 AI 언어모델이야 대답은 (예 or 아니오)로만 할 수 있어");
        ArrayNode messagesArray = objectMapper.createArrayNode().add(messagesNode);
        messagesNode = objectMapper.createObjectNode();
        messagesNode.put("role", "user").put("content", prompt);
        messagesArray.add(messagesNode);

        ObjectNode requestBodyNode = objectMapper.createObjectNode();
        requestBodyNode.put("model", "gpt-3.5-turbo-0125");
        requestBodyNode.set("messages", messagesArray);
        requestBodyNode.put("max_tokens", maxTokens);
        requestBodyNode.put("n", 1);
        requestBodyNode.put("temperature", temperature);

        try {
            String requestBody = objectMapper.writeValueAsString(requestBodyNode);

            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return responseEntity.getBody();
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();  // Handle or log the exception as needed
            return null;
        }
    }
}
