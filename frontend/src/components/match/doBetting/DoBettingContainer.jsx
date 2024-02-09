import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import Swal from "sweetalert2";

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
        await bettingApi
          .betting({
            userId: userState.userId,
            matchId: match.matchId,
            bettingTeamId: teamId,
            amount: bettingAmount,
          })
          .catch(() => {
            Swal.fire({
              title: "베팅에 실패했습니다.",
              icon: "error",
              cancelButtonText: "확인",
            }).then(() => {
              setBetComplete(true);
            });
          })
          .then(() => {
            Swal.fire({
              title: `${teamName}에 ${bettingAmount}골 베팅했습니다.`,
              icon: "success",
              confirmButtonText: "확인",
            }).then(() => {
              setBetComplete(true);
            });
          });
      } catch {
        Swal.fire({
          title: "베팅에 실패했습니다.",
          icon: "error",
          cancelButtonText: "확인",
        }).then(() => {
          setBetComplete(true);
        });
      }
    } else {
      Swal.fire({
        title: "팀과 베팅골을 선택해주세요.",
        icon: "info",
        confirmButtonText: "확인",
      });
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
                placeholder={0}
                value={bettingAmount === 0 ? "" : bettingAmount}
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
