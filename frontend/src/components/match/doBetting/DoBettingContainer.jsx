import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  DoBetContainer,
  DoBetButtonContainer,
  TeamSelectButton,
  TeamNameContainer,
  TeamNameComponent,
  TeamName,
  DoBetInputContainer,
  DoBetInputComponent,
  InputForm,
  DoBetInputBox,
  DoBetLabel,
  DoBetButton,
  DoBetText,
  DoBetTitleComponent,
  DoBetTitle,
} from "../../../styles/match-styles/doBetting/DoBettingContainerStyles";
import {
  Betting,
  BadgeImg,
} from "../../../styles/match-styles/MatchDetailStyle";
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
          <DoBetTitle>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Money%20Bag.png"
              alt="Money Bag"
              width="20"
              height="20"
            />
            <div>베팅 하기</div>
          </DoBetTitle>
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
                type="text"
                onChange={(e) => {
                  const val = e.target.value;
                  setBettingAmount(val.replace(/\D/g, "")); // 숫자가 아닌 문자를 모두 제거합니다.
                }}
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

export default DoBettingContainer;
