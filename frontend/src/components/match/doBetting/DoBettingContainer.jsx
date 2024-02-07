import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  PredictBox,
  Betting,
} from "../../../styles/MatchStyles/MatchDetailStyle";
import * as bettingApi from "../../../api/betting";
import { UserState } from "../../../global/UserState";

function DoBettingContainer({ match }) {
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

  const [selectedTeam, setSelectedTeam] = useState(null); // 'home', 'draw', 'away'
  const [bettingAmount, setBettingAmount] = useState(0);
  const [userState] = useRecoilState(UserState);
  const { matchId } = useParams();
  const [betComplete, setBetComplete] = useState(false);
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
          matchId: match.matchId,
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
  const handleTeamClick = (team) => {
    setSelectedTeam(selectedTeam === team ? null : team); // 기존에 선택된 팀이면 선택 해제, 아니면 선택
  };

  return (
    <Betting>
      <div>
        <DoBetTitleComponent>
          <DoBetTitle> 💰 베팅 하기 </DoBetTitle>
        </DoBetTitleComponent>
      </div>

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
  );
}
const DoBetTitleComponent = styled.div`
  display: flex;
  justify-content: start;

  align-items: flex-end;
`;

const DoBetTitle = styled.div`
  font-weight: bold;
  color: #002266;
`;
export default DoBettingContainer;
