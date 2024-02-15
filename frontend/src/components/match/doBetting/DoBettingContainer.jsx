import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { getMatchDetail } from "../../../api/match";

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

function DoBettingContainer({ data, setIsBetted }) {
  const [selectedTeam, setSelectedTeam] = useState(null); // 'home', 'draw', 'away'
  const [bettingAmount, setBettingAmount] = useState(0);
  const [userState] = useRecoilState(UserState);
  const { matchId } = useParams();
  const [match, setMatch] = useState(data);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 값 추가
  const [betComplete, setBetComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMatchDetail(matchId);
      setMatch(result);
      setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
    };
    fetchData();
  }, [matchId]);

  useEffect(() => {
    const checkBetting = async () => {
      if (match && userState.userId) {
        const response = await bettingApi.checkBetting({
          matchId,
          userId: userState.userId,
        });

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
      }
    };
    if (!isLoading) {
      checkBetting();
    }
  }, [match, userState.userId, matchId]);

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

  const isLeftMoreThanTenMinutes = (matchAt) => {
    const targetTime = new Date(matchAt);
    const currentTime = new Date();
    const timeDifferenceInMinues = Math.floor(
      (targetTime - currentTime) / 1000 / 60,
    );

    if (timeDifferenceInMinues >= 1) {
      return true;
    }
    return false;
  };

  const leftMoreThanTenMinutes = isLeftMoreThanTenMinutes(match.matchAt);

  const handleBettingClick = async () => {
    const teamId = match
      ? selectedTeam === "home"
        ? match.homeTeamId
        : selectedTeam === "draw"
          ? 0
          : match.awayTeamId
      : null;

    const teamName = match
      ? selectedTeam === "home"
        ? match.homeTeamName
        : selectedTeam === "draw"
          ? "무승부"
          : match.awayTeamName
      : null;

    if (selectedTeam && bettingAmount > 0) {
      try {
        await bettingApi
          .betting({
            userId: userState.userId,
            matchId,
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
              setIsBetted(true);
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
  if (!match) {
    return <div>Loading...</div>;
  }

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
            disabled={
              betComplete || match.status === "done" || !leftMoreThanTenMinutes
            }
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
            disabled={
              betComplete || match.status === "done" || !leftMoreThanTenMinutes
            }
          >
            <TeamName>무승부</TeamName>
          </TeamSelectButton>
          <TeamSelectButton
            type="button"
            selected={selectedTeam === "away"}
            onClick={() => handleTeamClick("away")}
            disabled={
              betComplete || match.status === "done" || !leftMoreThanTenMinutes
            }
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
            <InputForm
              disabled={
                betComplete ||
                match.status === "done" ||
                !leftMoreThanTenMinutes
              }
            >
              <DoBetInputBox
                id="bettingGoal"
                type="text"
                onChange={(e) => {
                  const val = e.target.value;
                  setBettingAmount(val.replace(/\D/g, "")); // 숫자가 아닌 문자를 모두 제거합니다.
                }}
                disabled={
                  betComplete ||
                  match.status === "done" ||
                  !leftMoreThanTenMinutes
                }
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
              disabled={
                betComplete ||
                match.status === "done" ||
                !leftMoreThanTenMinutes
              }
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
