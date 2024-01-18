package com.kl1verse.UserServer.global.exception;

import com.kl1verse.UserServer.domain.auth.exception.TokenException;
import com.kl1verse.UserServer.domain.sample.exception.SampleException;
import com.kl1verse.UserServer.domain.user.exception.UserException;
import com.kl1verse.UserServer.global.dto.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/*
* 예외를 처리하는 핸들러
*/
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /*
    * controller에서 던져진 SampleException을 처리한다.
    * @ExceptionHandler(<처리할 예외>.class) annotation을 이용
    * 예외가 발생한 순간 -> log 찍기
    * BaseResponse.fail()를 이용하여 사용자 커스텀한 코드 및 메시지를 응답으로 보내기
    */
    @ExceptionHandler(SampleException.class)
    public BaseResponse<Void> handleSampleException(SampleException e) {
        log.info("SampleException: {}", e.getMessage());
        return BaseResponse.fail(e.getResponseCode(), null);
    }

    @ExceptionHandler(UserException.class)
    public BaseResponse<Void> handleUserException(UserException e) {
        log.info("UserException: {}", e.getMessage());
        return BaseResponse.fail(e.getResponseCode(), null);
    }

    @ExceptionHandler(TokenException.class)
    public BaseResponse<Void> handleTokenException(TokenException e) {
        log.info("TokenException: {}", e.getMessage());
        return BaseResponse.fail(e.getResponseCode(), null);
    }

}
