import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  PredictBox,
  Betting,
} from "../../../styles/MatchStyles/MatchDetailStyle";
import PredictionComponent from "./PredictionComponent";
import * as bettingApi from "../../../api/betting";
import { UserState } from "../../../global/UserState";

export default function PredictionContainer({ match }) {
  match = {
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "울산 HD FC",
    awayTeamName: "포항스틸러스",
    homeBettingAmount: 40,
    awayBettingAmount: 110,
    drawBettingAmount: 72,
    matchAt: "2024-02-03T13:00:00",
    status: "done",
    homeScore: 1,
    awayScore: 2,
    home: "울산 문수",
  };

  const [userState] = useRecoilState(UserState);
  const { matchId } = useParams();
  const { homeBettingAmount } = match;
  const { drawBettingAmount } = match;
  const { awayBettingAmount } = match;

  const totalBettingAmount =
    homeBettingAmount + drawBettingAmount + awayBettingAmount;

  const [selectedTeam, setSelectedTeam] = useState(null); // 'home', 'draw', 'away'
  const [bettingAmount, setBettingAmount] = useState(0);

  const handleTeamClick = (team) => {
    setSelectedTeam(selectedTeam === team ? null : team); // 기존에 선택된 팀이면 선택 해제, 아니면 선택
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
          userId: 1, // 나중에 userId 가져올 수 있도록 수정
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
    <PredictBox>
      <div>
        <PredictBoxTitleComponent>
          <PredictBoxTitle> 🏆 승부 예측 </PredictBoxTitle>
          <PredictBoxSubTitle>
            {homeBettingAmount + drawBettingAmount + awayBettingAmount}참여
          </PredictBoxSubTitle>
        </PredictBoxTitleComponent>
      </div>

      <PredictionChartOuterContainer>
        <PredictionChartInnerContainer>
          <PredictionComponent
            teamName={match.homeTeamName}
            teamId={match.homeTeamId}
            bettingAmount={homeBettingAmount}
            totalBettingAmount={totalBettingAmount}
          />
        </PredictionChartInnerContainer>
        <PredictionChartInnerContainer>
          <PredictionComponent
            teamName={match.awayTeamName}
            teamId={match.awayTeamId}
            bettingAmount={awayBettingAmount}
            totalBettingAmount={totalBettingAmount}
          />
        </PredictionChartInnerContainer>
        <PredictionChartInnerContainer>
          <PredictionComponent
            teamName="무승부"
            bettingAmount={drawBettingAmount}
            totalBettingAmount={totalBettingAmount}
          />
        </PredictionChartInnerContainer>
      </PredictionChartOuterContainer>
    </PredictBox>
  );
}

const PredictBoxTitleComponent = styled.div`
  display: flex;
  justify-content: start;

  align-items: flex-end;
`;

const PredictBoxTitle = styled.div`
  font-weight: bold;
  color: #002266;
`;

const PredictBoxSubTitle = styled.div`
  margin-left: 1rem;
  font-size: 0.8rem;
  color: #595959;
`;

const PredictionChartOuterContainer = styled.div`
  justify-content: space-between;
  align-items: center;
`;

const PredictionChartInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  border-bottom: 1px solid #f4f4f4;
  color: #595959;

  padding: 10px;
`;
