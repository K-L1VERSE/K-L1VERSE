package com.kl1verse.UserServer.global;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/*
 * code와 message를 커스텀해서 사용
 * 보통 예외에 대한 code와 msg 직접 커스텀
 */
@AllArgsConstructor
@Getter
public enum ResponseCode {

    // 200 OK
    OK(HttpStatus.OK.value(), "OK"),

    // Sample
    SAMPLE_EXCEPTION(9999, "샘플예외 입니다."),

    // User
    INVALID_USER_INFO(1000, "유효하지 않은 유저 입니다."),
    USER_ALREADY_EXIST_ERROR(1001, "이미 존재하는 유저 입니다."),

    // Token
    EXPIRED_ACCESS_TOKEN(1100, "액세스 토큰 만료"),
    EXPIRED_REFRESH_TOKEN(1101, "리프레쉬 토큰 만료");



    /*
     * 이 부분에 처리할 예외를 하나씩 추가하기
     * 도메인 별로 묶어서 코드 작성!!
     */




    private final int code;
    private final String message;
}
