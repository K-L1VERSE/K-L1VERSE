package com.kl1verse.UserServer.domain.oauth.controller;

import com.kl1verse.UserServer.domain.auth.dto.res.SignInResDto;
import com.kl1verse.UserServer.domain.oauth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/login/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    /*
    * Google로 로그인 후 Google 승인 서버로 부터 Authorization Code를 응답받는 컨트롤러
    * */

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @GetMapping("/code/{registrationId}")
    // @RequestParam, @Pathvariable 둘 다 (name = "") 선언을 안해주니까 에러남
    public ResponseEntity<SignInResDto> socialLogin(@RequestParam(name = "code") String code, @PathVariable(name = "registrationId") String registrationId) {
        log.info("code = {}", code);
        log.info("registrationId = {}", registrationId);
        return ResponseEntity.ok().body(oAuthService.socialLogin(code, registrationId));
    }
}
