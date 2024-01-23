package com.KL1verse.match.betting.service;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import org.springframework.stereotype.Service;

@Service
public interface BettingService {
    void bettingCancel(String bettingId);

}
