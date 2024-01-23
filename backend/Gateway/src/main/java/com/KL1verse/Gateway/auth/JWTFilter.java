package com.KL1verse.Gateway.auth;

import com.KL1verse.Gateway.auth.JwtUtil.Status;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.server.mvc.filter.FilterFunctions;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.net.URI;
import java.util.List;
import java.util.function.Function;

import static org.springframework.cloud.gateway.server.mvc.filter.FilterFunctions.redirectTo;

@Slf4j
public class JWTFilter {

    public static HandlerFilterFunction<ServerResponse, ServerResponse> instrument() {
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
                        .header("Location", "http://localhost:3000/login")
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
                        .header("Location", "http://localhost:3000/login")
                        .build();
            } else if(JwtUtil.isValidAccessToken(token) == Status.EXPIRED) {
                /*
                 * Access Token 만료 된 경우
                 * UserServer에게 Access Token 재발급 요청
                 */
                log.info("Access Token expired");
                ServerRequest modifiedRequest = ServerRequest.from(request)
                    .uri(URI.create("/users/access_token/reissue"))
                    .build();

                return next.handle(modifiedRequest);
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