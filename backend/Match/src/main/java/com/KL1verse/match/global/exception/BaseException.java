package com.KL1verse.match.global.exception;

import com.KL1verse.match.global.ResponseCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 공통 예외 class
 */
@AllArgsConstructor
@Getter
public class BaseException extends RuntimeException {

    private final ResponseCode responseCode;

    @Override
    public String getMessage() {
        return responseCode.getMessage();
    }
}
