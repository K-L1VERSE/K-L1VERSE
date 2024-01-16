package com.KL1verse.Survey.domain.sample.exception;

import com.KL1verse.Survey.global.ResponseCode;
import com.KL1verse.Survey.global.exception.BaseException;

public class SampleException extends BaseException {

    public SampleException(ResponseCode responseCode) {
        super(responseCode);
    }

}
