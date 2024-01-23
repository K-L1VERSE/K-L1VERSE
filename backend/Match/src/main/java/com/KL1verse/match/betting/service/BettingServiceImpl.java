package com.KL1verse.match.betting.service;

import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.betting.repository.entity.Betting;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BettingServiceImpl implements BettingService {

    private final BettingRepository bettingRepository;
    private final MatchRepository matchRepository;

    @Autowired
    private ObjectMapper objectMapper;

    // 분산 트랜잭션 실패 시, 베팅번호를 삭제하며 롤백을 위한 메소드
    // 게임베팅 롤백 이벤트 구독해서 해당 베팅 삭제
    @Override
    @Transactional
    public void bettingCancel(String bettingId) {

        // bettingId로 삭제할 betting 찾기
        Betting betting = bettingRepository.findById(Integer.parseInt(bettingId)).orElseThrow();

        // 베팅한 팀이 home인지 away인지 알아내기 -> game table 수정해야함 (베팅액 내리기)
        Match match = matchRepository.findById(betting.getMatchId()).orElseThrow();

        // home team에 베팅했으면
        if(betting.getBettingTeamId() == match.getHomeTeamId()){
            int newAmount = match.getHomeBettingAmount() - betting.getAmount();
            matchRepository.updateHomeBettingAmount(match.getMatchId(), newAmount);
        }else{ // away team에 베팅했으면
            int newAmount = match.getAwayBettingAmount() - betting.getAmount();
            matchRepository.updateAwayBettingAmount(match.getMatchId(), newAmount);
        }

        bettingRepository.deleteById(Integer.parseInt(bettingId));

    }

}
