import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  PredictBox,
  PercentBox,
  Betting,
} from "../../styles/match-styles/MatchDetailStyle";
import * as bettingApi from "../../api/betting";
import { UserState } from "../../global/UserState";

export default function BettingContainer({ match }) {
  const [userState] = useRecoilState(UserState);
  const { matchId } = useParams();
  const [betComplete, setBetComplete] = useState(false);
  useEffect(() => {
    const checkBetting = async () => {
      const response = await bettingApi.checkBetting({
        matchId,
        userId: userState.userId,
      });
      if (response.data.betGoal === 0) {
      } else {
        setBetComplete(true);
      }
    };
    checkBetting();
  }, [matchId, userState.userId]);

  const { homeBettingAmount } = match;
  const { drawBettingAmount } = match;
  const { awayBettingAmount } = match;

  const totalBettingAmount =
    homeBettingAmount + drawBettingAmount + awayBettingAmount;
  const homeBettingRatio = (homeBettingAmount / totalBettingAmount) * 100;
  const drawBettingRatio = (drawBettingAmount / totalBettingAmount) * 100;
  const awayBettingRatio = (awayBettingAmount / totalBettingAmount) * 100;

  const homeOdds = totalBettingAmount / homeBettingAmount;
  const drawOdds = totalBettingAmount / drawBettingAmount;
  const awayOdds = totalBettingAmount / awayBettingAmount;

  const totalOdds = homeOdds + drawOdds + awayOdds;
  const homeOddsRatio = (homeOdds / totalOdds) * 100;
  const drawOddsRatio = (drawOdds / totalOdds) * 100;
  const awayOddsRatio = (awayOdds / totalOdds) * 100;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [bettingAmount, setBettingAmount] = useState(0);

  const handleTeamClick = (team) => {
    setSelectedTeam(selectedTeam === team ? null : team);
  };

  const handleBettingClick = async () => {
    const teamId =
      selectedTeam === "home"
        ? match.homeTeamId
        : selectedTeam === "draw"
          ? 0
          : match.awayTeamId;
    const teamName =
      selectedTeam === "home"
        ? match.homeTeamName
        : selectedTeam === "draw"
          ? "무승부"
          : match.awayTeamName;

    if (selectedTeam && bettingAmount > 0) {
      try {
        await bettingApi.betting({
          userId: 1,
          matchId,
          bettingTeamId: teamId,
          amount: bettingAmount,
        });
        alert(`${teamName}에 ${bettingAmount}골 베팅했습니다.`);
        window.location.reload();
      } catch (error) {
        alert("베팅에 실패했습니다.");
      }
    } else {
      alert("팀과 베팅골을 선택해주세요.");
    }
  };

  return (
    <div>
      <div>[ 승부 예측 ]</div>
      <PredictBox>
        <HomePredict style={{ width: `${homeBettingRatio}%` }}>
          <div>{match.homeTeamName}</div>
          <div>{homeBettingAmount}</div>
        </HomePredict>
        <DrawPredict style={{ width: `${drawBettingRatio}%` }}>
          <div>무승부</div>
          <div>{drawBettingAmount}</div>
        </DrawPredict>
        <AwayPredict style={{ width: `${awayBettingRatio}%` }}>
          <div>{match.awayTeamName}</div>
          <div>{awayBettingAmount}</div>
        </AwayPredict>
      </PredictBox>
      <div>[ 현재배율 ]</div>
      <PercentBox>
        <HomePercent style={{ width: `${homeOddsRatio}%` }}>
          {homeOdds.toFixed(2)} 배
        </HomePercent>
        <DrawPercent style={{ width: `${drawOddsRatio}%` }}>
          {drawOdds.toFixed(2)} 배
        </DrawPercent>
        <AwayPercent style={{ width: `${awayOddsRatio}%` }}>
          {awayOdds.toFixed(2)} 배
        </AwayPercent>
      </PercentBox>
      <Betting>
        <div>베팅하기</div>
        <button
          type="button"
          style={{
            backgroundColor: selectedTeam === "home" ? "blue" : "transparent",
          }}
          onClick={() => handleTeamClick("home")}
        >
          {match.homeTeamName}
        </button>
        <button
          type="button"
          style={{
            backgroundColor: selectedTeam === "draw" ? "blue" : "transparent",
          }}
          onClick={() => handleTeamClick("draw")}
        >
          무승부
        </button>
        <button
          type="button"
          style={{
            backgroundColor: selectedTeam === "away" ? "blue" : "transparent",
          }}
          onClick={() => handleTeamClick("away")}
        >
          {match.awayTeamName}
        </button>
        <div>
          <input
            type="number"
            onChange={(e) => setBettingAmount(e.target.value)}
          />{" "}
          골
          <button
            type="button"
            onClick={handleBettingClick}
            disabled={betComplete}
          >
            베팅
          </button>
        </div>
      </Betting>
    </div>
  );
}

const HomePredict = styled.div`
  border: 1px solid black;
`;

const DrawPredict = styled.div`
  border: 1px solid black;
`;

const AwayPredict = styled.div`
  border: 1px solid black;
`;

const HomePercent = styled.div`
  border: 1px solid black;
`;

const DrawPercent = styled.div`
  border: 1px solid black;
`;

const AwayPercent = styled.div`
  border: 1px solid black;
`;
