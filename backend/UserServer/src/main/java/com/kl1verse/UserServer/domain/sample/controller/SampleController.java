package com.kl1verse.UserServer.domain.sample.controller;

import com.kl1verse.UserServer.domain.sample.exception.SampleException;
import com.kl1verse.UserServer.global.ResponseCode;
import com.kl1verse.UserServer.global.dto.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/sample")
public class SampleController {

    /*
    * 샘플 OK 응답 컨트롤러
    * Postman에서 "/sample/ok" uri로 요청 -> {code: 200, message: "OK"}
    */
    @RequestMapping("/ok")
    public BaseResponse<Void> sampleOK() {
        return BaseResponse.success(null);
    }

    /*
    * 샘플 Fail 응답 컨트롤러
    * 각 도메인 별 Exception 정의 -> SampleException
    * ResponseCode에 각 도메인 별 예외 코드 및 메시지 정의
    * throw new <정의한 도메인 Exception>Exception(ResponseCode.<정의한 예외 코드 및 메시지의 이름>)으로 예외 던지기
    * global > exception > GlobalExceptionHandler.java 에서 던진 예외를 처리할 수 있도록 정의
    */
    @RequestMapping("/fail")
    public BaseResponse<Void> sampleFail() {
        throw new SampleException(ResponseCode.SAMPLE_EXCEPTION);
    }
}
