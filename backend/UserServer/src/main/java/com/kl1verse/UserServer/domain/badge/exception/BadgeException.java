package com.kl1verse.UserServer.domain.badge.exception;

import com.kl1verse.UserServer.global.ResponseCode;
import com.kl1verse.UserServer.global.exception.BaseException;

public class BadgeException extends BaseException {

    public BadgeException(ResponseCode responseCode) {
        super(responseCode);
    }
}
