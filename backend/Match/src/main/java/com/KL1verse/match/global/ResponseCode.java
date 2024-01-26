package com.KL1verse.match.global;

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



    /*
     * 이 부분에 처리할 예외를 하나씩 추가하기
     * 도메인 별로 묶어서 코드 작성!!
     */
    // Match
    INVALID_MATCH_INFO(2000, "매치 정보가 올바르지 않습니다."),
    ALREADY_BETTED_MATCH(2001, "이미 베팅한 매치입니다.");



    private final int code;
    private final String message;
}
