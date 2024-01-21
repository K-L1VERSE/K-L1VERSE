package com.kl1verse.UserServer.domain.user.controller;


import com.kl1verse.UserServer.domain.user.dto.res.MypageResponseDto;
import com.kl1verse.UserServer.domain.user.service.MypageServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final MypageServiceImpl mypageService;

    @GetMapping("/hello")
    public String hello() {
        log.info(("Hello World!"));
        return "Hello World!";
    }

    @GetMapping("/mypage")
    public ResponseEntity<MypageResponseDto> userinfo(HttpServletRequest request) {
        log.info("user info");
        return ResponseEntity.ok(mypageService.getUserInfo(request));
    }
}
