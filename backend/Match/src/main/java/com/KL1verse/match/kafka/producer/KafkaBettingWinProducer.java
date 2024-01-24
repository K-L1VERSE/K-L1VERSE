package com.KL1verse.match.kafka.producer;

import com.KL1verse.match.betting.dto.Winner;
import com.KL1verse.match.betting.repository.BettingRepository;
import com.KL1verse.match.betting.repository.entity.Betting;
import com.KL1verse.match.kafka.KafkaProducer;
import com.KL1verse.match.match.repository.MatchRepository;
import com.KL1verse.match.match.repository.entity.Match;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaBettingWinProducer {

    private final KafkaProducer kafkaProducer;
    private final BettingRepository bettingRepository;
    private final MatchRepository matchRepository;

    @Autowired
    private ObjectMapper objectMapper;

    // 게임 끝난거 확인했을 때 불릴 메소드
    public void bettingWin(int matchId, int winningTeamId) {
        
        // 원금 + 원금*배율 계산해서 보내주기
        // matchId로 match 찾기
        Match match = matchRepository.findById(matchId).orElseThrow();

        int winningTeamBettingTotal = 0;
        int HomeTeamBettingTotal = match.getHomeBettingAmount();
        int AwayTeamBettingTotal = match.getAwayBettingAmount();
        int drawBettingTotal = match.getDrawBettingAmount();

        // 원금 + 원금*배율 계산
        float rate = 1;

        // home팀이 이겼을 때
        if(match.getHomeTeamId() == winningTeamId) {
            winningTeamBettingTotal = match.getHomeBettingAmount();
        } else if(match.getAwayTeamId() == winningTeamId){ // away 팀이 이겼을 때
            winningTeamBettingTotal = match.getAwayBettingAmount();
        } else { // 비겼을 때
            winningTeamBettingTotal = match.getDrawBettingAmount();
        }

        if(winningTeamBettingTotal > 0) {
            rate = ((float) HomeTeamBettingTotal + AwayTeamBettingTotal + drawBettingTotal) / winningTeamBettingTotal;
        }
        // 아무도 베팅 안한 팀이 이기면? 그냥 다들 사라짐.

        // winner info 가져오기
        List<Betting> bettingList = bettingRepository.findByMatchIdAndBettingTeamId(matchId, winningTeamId);

        // 반환하는 list가 있을 때
        if(bettingList.size() > 0) {

            for(int i=0; i<bettingList.size(); i++) {
                Betting betting = bettingList.get(i);
                int newGoal = Math.round(betting.getAmount() * rate);

                Winner winner = Winner.builder()
                    .userId(betting.getUserId())
                    .newGoal(newGoal)
                    .build();

                // Json으로 바꿔서 user로 보내줌
                String winnerInfoJson = null;
                try {
                    winnerInfoJson = objectMapper.writeValueAsString(winner);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }

                // match테이블에서 분배 안했을 때 확인
                if(match.getGoalDivided() == 0) {
                    matchRepository.updateGoalDivided(matchId, 1);
                    kafkaProducer.sendMessage("winner-info", winnerInfoJson);
                }

            }
        }

    }




}
