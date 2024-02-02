package com.KL1verse.match.match.exception;

import com.KL1verse.match.global.ResponseCode;
import com.KL1verse.match.global.exception.BaseException;

public class MatchException extends BaseException {
    public MatchException(ResponseCode responseCode) {
        super(responseCode);
    }
}
