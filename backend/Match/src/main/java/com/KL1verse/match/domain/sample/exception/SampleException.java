package com.kl1verse.UserServer.domain.sample.exception;

import com.kl1verse.UserServer.global.ResponseCode;
import com.kl1verse.UserServer.global.exception.BaseException;

public class SampleException extends BaseException {

    public SampleException(ResponseCode responseCode) {
        super(responseCode);
    }

}
