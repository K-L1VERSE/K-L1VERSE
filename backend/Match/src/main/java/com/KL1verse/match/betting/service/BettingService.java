package com.KL1verse.match.betting.service;

import org.springframework.stereotype.Service;

@Service
public interface BettingService {

    void bettingCancel(String bettingId);

    int checkBetting(int matchId, int userId);

    int checkBettingTeam(int matchId, int userId);
}
