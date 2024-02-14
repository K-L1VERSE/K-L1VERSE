package com.KL1verse.Gateway;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.rewritePath;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

import com.KL1verse.Gateway.auth.JWTFilter;
import jakarta.servlet.ServletException;
import java.io.IOException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Slf4j
@SpringBootApplication
@RequiredArgsConstructor
public class GatewayApplication {

	@Value("${domain}")
	private String domain;

	private final JWTFilter jwtFilter;

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Bean
	public RouterFunction<ServerResponse> getAuthServiceRoute() {
		return route("AUTH-SERVICE")
			.route(path("/user/login/**", "/user/auth/**"), http(domain+":8010"))
			.before(rewritePath("/user/(?<segment>.*)", "/${segment}"))
			.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getUserServiceRoute() {
		return route("USER-SERVICE")
			.route(path("/user/**"), http(domain+":8010"))
			.before(rewritePath("/user/(?<segment>.*)", "/${segment}"))
			.filter(jwtFilter.instrument())
			.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getSurveyServiceRoute() {
		return route("SURVEY-SERVICE")
			.route(path("/survey/**"), http(domain+":8020"))
			.before(rewritePath("/survey/(?<segment>.*)", "/${segment}"))
			.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getBoardServiceRoute() {
		return route("BOARD-SERVICE")
			.route(path("/board/**"), http(domain+":8030"))
			.before(rewritePath("/board/(?<segment>.*)", "/${segment}"))
			.filter(jwtFilter.instrument())
			.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getMatchServiceRoute() {
		return route("MATCH-SERVICE")
			.route(path("/match/**"), http(domain+":8040"))
			.before(rewritePath("/match/(?<segment>.*)", "/${segment}"))
			.filter(jwtFilter.instrument())
			.build();
	}


}
