package com.KL1verse.Gateway.auth;

import com.KL1verse.Gateway.auth.JwtUtil.Status;
import com.KL1verse.Gateway.auth.dto.res.AccessTokenResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.server.mvc.filter.FilterFunctions;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.net.URI;
import java.net.URL;
import java.util.List;
import java.util.function.Function;

import static org.springframework.cloud.gateway.server.mvc.filter.FilterFunctions.redirectTo;

@Service
@Slf4j
@RequiredArgsConstructor
public class JWTFilter {

    @Value("${domain}")
    private String domain;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public HandlerFilterFunction<ServerResponse, ServerResponse> instrument() {
        return (request, next) -> {
            List<String> tokenList = request.headers().header("Authorization");
            if (tokenList.isEmpty()) {
                /*
                 * Access Token 없이 요청한 경우
                 * 401 Unauthorized
                 * login 페이지로 redirect
                 */
                log.info("Access Token is null");
                return ServerResponse.status(HttpStatus.UNAUTHORIZED)
                        .header("Location", domain+":3000/login")
                        .build();
            }

            String token = tokenList.get(0).replace("Bearer ", "");
            if(JwtUtil.isValidAccessToken(token) == Status.INVALID) {
                /*
                 * Access Token 유효하지 않은 경우
                 * 401 Unauthorized
                 * login 페이지로 redirect
                 */
                log.info("Access Token invalid");
                return ServerResponse.status(HttpStatus.UNAUTHORIZED)
                        .header("Location", domain+":3000/login")
                        .build();
            } else if(JwtUtil.isValidAccessToken(token) == Status.EXPIRED) {
                /*
                 * Access Token 만료 된 경우
                 * UserServer에게 Access Token 재발급 요청
                 */
                log.info("Access Token expired");
                ServerRequest modifiedRequest = ServerRequest.from(request)
                    .build();

                // restTemplate으로 get요청 보내기
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", tokenList.get(0));
                HttpEntity<String> entity = new HttpEntity<>(headers);

                String url = domain + ":8010/users/access_token/reissue";
                HttpEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
                );

                // UserServer로부터 받은 응답을 가지고 새로운 Access Token으로 요청 보내기
                String newToken = response.getBody();
                if(newToken != null ){
                    log.info("Refresh Token 유효");
                    AccessTokenResDto accessTokenResDto = objectMapper.readValue(newToken, AccessTokenResDto.class);
    
                    return ServerResponse.status(HttpStatus.UNAUTHORIZED)
                            .header("Authorization", "Bearer " + accessTokenResDto.getAccessToken())
                            .build();
                } else {
                    log.info("Refresh Token 만료");
                    return ServerResponse.status(HttpStatus.UNAUTHORIZED)
                            .header("Location", domain+":3000/login")
                            .build();
                }

            } else {
                /*
                 * Access Token이 유효한 경우
                 */
                log.info("Access Token: " + token);
                return next.handle(request);

            }
        };
    }
}