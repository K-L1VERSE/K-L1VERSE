package com.KL1verse.match.domain.sample.exception;


import com.KL1verse.match.global.ResponseCode;
import com.KL1verse.match.global.exception.BaseException;

public class SampleException extends BaseException {

    public SampleException(ResponseCode responseCode) {
        super(responseCode);
    }

}
