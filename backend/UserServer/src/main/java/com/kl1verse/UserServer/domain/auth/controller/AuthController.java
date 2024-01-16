package com.kl1verse.UserServer.domain.auth.controller;

import com.kl1verse.UserServer.domain.auth.dto.req.SignInReqDto;
import com.kl1verse.UserServer.domain.auth.dto.req.SignUpReqDto;
import com.kl1verse.UserServer.domain.auth.dto.res.SignInResDto;
import com.kl1verse.UserServer.domain.auth.service.AuthService;
import com.kl1verse.UserServer.global.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/sign-up")
    public BaseResponse<Void> signUp(@RequestBody SignUpReqDto signUpReqDto) {
        authService.signUp(signUpReqDto);
        return BaseResponse.success(null);
    }

    @PostMapping("/sign-in")
    public BaseResponse<SignInResDto> signIn(@RequestBody SignInReqDto signInReqDto) {
        return BaseResponse.success(authService.signIn(signInReqDto));
    }
}
