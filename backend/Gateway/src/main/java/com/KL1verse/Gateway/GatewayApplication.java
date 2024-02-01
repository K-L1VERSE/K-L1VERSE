package com.KL1verse.Gateway;

import static com.KL1verse.Gateway.auth.JWTFilter.instrument;
import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.rewritePath;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

import jakarta.servlet.ServletException;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Slf4j
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Bean
	public RouterFunction<ServerResponse> getAuthServiceRoute() {
		return route("AUTH-SERVICE")
			.route(path("/user/login/**", "/user/auth/**"), http("https://i10a409.p.ssafy.io:8010"))
			.before(rewritePath("/user/(?<segment>.*)", "/${segment}"))
			.after(((serverRequest, serverResponse) -> {
                try {
                    log.info("body = {}", serverRequest.body(String.class));
                } catch (ServletException e) {
                    throw new RuntimeException(e);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                return serverResponse;
			}))
			.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getUserServiceRoute() {
		return route("USER-SERVICE")
			.route(path("/user/**"), http("https://i10a409.p.ssafy.io:8010"))
			.before(rewritePath("/user/(?<segment>.*)", "/${segment}"))
			.filter(instrument())
			.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getSurveyServiceRoute() {
		return route("SURVEY-SERVICE")
			.route(path("/survey/**"), http("https://i10a409.p.ssafy.io:8020"))
			.before(rewritePath("/survey/(?<segment>.*)", "/${segment}"))
			.filter(instrument())
			.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getBoardServiceRoute() {
		return route("BOARD-SERVICE")
			.route(path("/board/**"), http("https://i10a409.p.ssafy.io:8030"))
			.before(rewritePath("/board/(?<segment>.*)", "/${segment}"))
			.filter(instrument())
			.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getMatchServiceRoute() {
		return route("MATCH-SERVICE")
			.route(path("/match/**"), http("https://i10a409.p.ssafy.io:8040"))
			.before(rewritePath("/match/(?<segment>.*)", "/${segment}"))
			.filter(instrument())
			.build();
	}


}
