package com.kl1verse.UserServer.domain.auth.controller;

import com.kl1verse.UserServer.domain.auth.dto.req.SignInReqDto;
import com.kl1verse.UserServer.domain.auth.dto.req.SignUpReqDto;
import com.kl1verse.UserServer.domain.auth.dto.res.SignInResDto;
import com.kl1verse.UserServer.domain.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<Void> signUp(@RequestBody SignUpReqDto signUpReqDto) {
        authService.signUp(signUpReqDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResDto> signIn(@RequestBody SignInReqDto signInReqDto) {
        return ResponseEntity.ok().body(authService.signIn(signInReqDto));
    }

    @GetMapping("/sign-out")
    public ResponseEntity<?> signOut(HttpServletRequest request) {
        authService.signOut(request);
        return ResponseEntity.ok().build();
    }
}
