package com.kl1verse.UserServer.domain.user.controller;

import com.kl1verse.UserServer.domain.user.dto.res.NostradamusResponse;
import com.kl1verse.UserServer.domain.user.service.NostradamusServiceImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/nostradamus")
@RequiredArgsConstructor
public class NostradamusController {

    private final NostradamusServiceImpl nostraService;

    public String hello() {
        return "Hello World!";
    }

    @GetMapping
    public ResponseEntity<List<NostradamusResponse>> nostra() {
        List<NostradamusResponse> nostraList = nostraService.getNostraList();
        return new ResponseEntity<>(nostraList, HttpStatus.OK);
    }

}
