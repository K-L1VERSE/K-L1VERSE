package com.KL1verse.match.betting.service;

import com.KL1verse.match.betting.dto.req.BettingRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface BettingService {
    void betting(int userId, BettingRequest bettingRequest);
}
