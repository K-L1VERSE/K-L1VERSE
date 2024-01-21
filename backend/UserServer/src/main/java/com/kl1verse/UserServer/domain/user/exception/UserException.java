package com.kl1verse.UserServer.domain.user.exception;

import com.kl1verse.UserServer.global.ResponseCode;
import com.kl1verse.UserServer.global.exception.BaseException;

public class UserException extends BaseException {
    public UserException(ResponseCode responseCode) {
        super(responseCode);
    }

}
