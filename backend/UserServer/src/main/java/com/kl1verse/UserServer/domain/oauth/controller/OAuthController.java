package com.kl1verse.UserServer.domain.oauth.controller;

import com.kl1verse.UserServer.domain.oauth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    /*
    * Google로 로그인 후 Google 승인 서버로 부터 Authorization Code를 응답받는 컨트롤러
    * */
    @GetMapping("/code/{registrationId}")
    // @RequestParam, @Pathvariable 둘 다 (name = "") 선언을 안해주니까 에러남
    public void googleLogin(@RequestParam(name = "code") String code, @PathVariable(name = "registrationId") String registrationId) {
        oAuthService.socialLogin(code, registrationId);

    }
}
