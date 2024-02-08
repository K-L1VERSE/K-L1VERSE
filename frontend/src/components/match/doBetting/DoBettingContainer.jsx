import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  Betting,
  BadgeImg,
} from "../../../styles/MatchStyles/MatchDetailStyle";
import * as bettingApi from "../../../api/betting";
import { UserState } from "../../../global/UserState";
import { ReactComponent as DoBetIcon } from "../../../assets/icon/do-bet-icon.svg";

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

  const bet = {
    betTeamId: 2,
    betGoal: 20,
  };

  const [selectedTeam, setSelectedTeam] = useState(null); // 'home', 'draw', 'away'
  const [bettingAmount, setBettingAmount] = useState(0);
  const [userState] = useRecoilState(UserState);
  const { matchId } = useParams();

  const [betComplete, setBetComplete] = useState(false);

  useEffect(() => {
    const checkBetting = async () => {
      const response = await bettingApi.checkBetting({
        matchId,
        userId: userState.userId,
      });
      // response.data === 0 : 아직 베팅 안함
      // response.data > 0 : 이미 베팅함
      if (response.data.betGoal === 0) {
        setBetComplete(false);
        console.log(`베팅 아직 안했음 : ${response.data}`);
      } else {
        setBetComplete(true);
        if (response.data.betTeamId === match.homeTeamId) {
          setSelectedTeam("home");
        } else if (response.data.betTeamId === match.awayTeamId) {
          setSelectedTeam("away");
        } else {
          setSelectedTeam("draw");
        }
        setBettingAmount(response.data.betGoal);
        console.log(`이미 베팅했음 : ${response.data}`);
      }
    };

    checkBetting();
  }, [matchId, userState.userId]);

  const getparsedTeamName = (teamName) => {
    let parsedTeamName = teamName.substring(0, 2);

    if (`${teamName}`.includes("서울") || `${teamName}`.includes("수원")) {
      parsedTeamName = `${teamName}`.substring(0, 4);
    } else if (`${teamName}`.includes("무승부")) {
      parsedTeamName = "무승부";
    }

    return parsedTeamName;
  };

  const getTeamSrc = (teamId) => {
    const teamsrc = `${process.env.PUBLIC_URL}/badge/badge${teamId}.png`;

    return teamsrc;
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

      <DoBetContainer>
        <DoBetButtonContainer>
          <TeamSelectButton
            type="button"
            selected={selectedTeam === "home"}
            onClick={() => handleTeamClick("home")}
            // betComplete가 true면 disabled
            disabled={betComplete}
          >
            <TeamNameContainer>
              <TeamNameComponent>
                <BadgeImg src={getTeamSrc(match.homeTeamId)} alt="home" />
                <TeamName>{getparsedTeamName(match.homeTeamName)}</TeamName>
              </TeamNameComponent>
            </TeamNameContainer>
          </TeamSelectButton>
          <TeamSelectButton
            type="button"
            selected={selectedTeam === "draw"}
            onClick={() => handleTeamClick("draw")}
            disabled={betComplete}
          >
            <TeamName>무승부</TeamName>
          </TeamSelectButton>
          <TeamSelectButton
            type="button"
            selected={selectedTeam === "away"}
            onClick={() => handleTeamClick("away")}
            disabled={betComplete}
          >
            <TeamNameContainer>
              <TeamNameComponent>
                <BadgeImg src={getTeamSrc(match.awayTeamId)} alt="away" />
                <TeamName>{getparsedTeamName(match.awayTeamName)}</TeamName>
              </TeamNameComponent>
            </TeamNameContainer>
          </TeamSelectButton>
        </DoBetButtonContainer>

        <DoBetInputContainer>
          <DoBetInputComponent>
            <InputForm disabled={betComplete}>
              <DoBetInputBox
                id="bettingGoal"
                type="number"
                onChange={(e) => setBettingAmount(e.target.value)}
                disabled={betComplete}
                value={bettingAmount}
              />
              <DoBetLabel htmlFor="bettingGoal">
                <div>골</div>
              </DoBetLabel>
            </InputForm>
            <DoBetButton
              type="button"
              onClick={handleBettingClick}
              disabled={betComplete}
            >
              <DoBetText>
                <DoBetIcon /> <div>베팅 하기</div>
              </DoBetText>
            </DoBetButton>
          </DoBetInputComponent>
        </DoBetInputContainer>
      </DoBetContainer>
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

const DoBetContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const DoBetButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const DoBetInputContainer = styled.div`
  align-items: center;
  width: 100%;
`;

const DoBetInputComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TeamSelectButton = styled.button`
  width: 110px;
  height: 56px;

  // 가운데 정렬
  display: flex;
  justify-content: center;
  align-items: center;

  border: ${({ selected }) =>
    selected ? "1px solid #CDD8EC" : "1px solid #F4F4F4"};
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? "#F2F6FD" : "white")};
`;

const TeamNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 90px;
  height: 40px;
`;

const TeamNameComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamName = styled.div`
  font-weight: bold;
  color: #222222;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;

  border-radius: 4px;
  border: ${({ disabled }) =>
    disabled ? "1px solid #A9A9A9" : "1px solid #3261c1"};

  width: 100%;
  height: 44px;

  /* gap: 12px; */

  input {
    width: 90%;
    padding: 0 1px;
    height: 44px;

    font-size: 1.2rem;

    border: none;
  }

  input:focus {
    outline: none;
  }

  label {
    width: 10%;
    height: 44px;
    font-size: 1.2rem;
    color: #222222;
  }
`;

const DoBetButton = styled.button`
  width: 100%;
  height: 48px;

  border: none;
  border-radius: 4px;
  /* betComplete가 true이면 비활성화 UI */
  background-color: ${({ disabled }) => (disabled ? "#A9A9A9" : "#3261c1")};
  color: white;

  font: inherit;
`;

const DoBetInputBox = styled.input`
  width: 100%;
  padding: 0 2px;
  height: 44px;

  font-size: 1.2rem;

  text-align: right;
`;

const DoBetLabel = styled.label`
  width: 10%;
  height: 44px;
  font-size: 1.2rem;
  color: #222222;

  // 가운데 정렬
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DoBetText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export default DoBettingContainer;
