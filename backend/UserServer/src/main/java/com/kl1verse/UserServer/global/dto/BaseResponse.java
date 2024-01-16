package com.kl1verse.UserServer.global.dto;

import com.kl1verse.UserServer.global.ResponseCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/*
 * 공통 응답 class
 * Front의 모든 요청은 200 OK로 응답
 * 서버측의 에러는 code, message 커스텀하여 응답
 */
@Getter
@RequiredArgsConstructor
public class BaseResponse<T> {

    private int code;
    private String message;
    private T data;

    private BaseResponse(int code, String msg, T data) {
        this.code = code;
        this.message = msg;
        this.data = data;
    }

    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse<T>(ResponseCode.OK.getCode(), ResponseCode.OK.getMessage(), data);
    }

    public static <T> BaseResponse<T> fail(ResponseCode responseCode, T data) {
        return new BaseResponse<T>(responseCode.getCode(), responseCode.getMessage(), data);
    }

}
