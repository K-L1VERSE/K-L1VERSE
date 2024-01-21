package com.kl1verse.UserServer.domain.auth.exception;

import com.kl1verse.UserServer.global.ResponseCode;
import com.kl1verse.UserServer.global.exception.BaseException;

public class TokenException extends BaseException {

    public TokenException(ResponseCode responseCode) {
        super(responseCode);
    }
}
