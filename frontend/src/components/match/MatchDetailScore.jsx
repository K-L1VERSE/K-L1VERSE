import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import MatchTimeComponent from "./MatchTimeComponent";
import { BadgeImg } from "../../styles/MatchStyles/MatchDetailStyle";
import ToLeftPng from "../../assets/ToLeft.png";

export default function MatchDetailScore({ match }) {
  match = {
    matchId: 201,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "울산 HD FC",
    awayTeamName: "포항스틸러스",
    matchAt: "2024-02-10T16:00:00",
    homeScore: 3,
    awayScore: 2,
    status: "during",
  };
  const homeTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.homeTeamId}.png`;
  const awayTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.awayTeamId}.png`;

  let homeTeamName = `${match.homeTeamName}`.substring(0, 2);

  let awayTeamName = `${match.awayTeamName}`.substring(0, 2);
  if (
    `${match.homeTeamName}`.includes("서울") ||
    `${match.homeTeamName}`.includes("수원")
  ) {
    homeTeamName = `${match.homeTeamName}`.substring(0, 4);
  }
  if (
    `${match.awayTeamName}`.includes("서울") ||
    `${match.awayTeamName}`.includes("수원")
  ) {
    awayTeamName = `${match.awayTeamName}`.substring(0, 4);
  }

  const navigate = useNavigate();
  const goPrevPage = () => {
    navigate(-1);
  };

  const getFormattedDateString = () => {
    const date = new Date(match.matchAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    // 요일을 가져오기 위한 배열
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    // 요일 추출
    const dayOfWeek = daysOfWeek[date.getDay()];

    // 결과 문자열 생성
    const formattedDateString = `${year}.${month}.${day} ${dayOfWeek}요일 ${hour}:${minute}`;

    return formattedDateString;
  };

  return (
    <div>
      <MatchDetailTop>
        <ToLeftImg src={ToLeftPng} onClick={goPrevPage} />
        {getFormattedDateString()}
      </MatchDetailTop>
      <MatchDetailContainer>
        <MatchDetailComponent>
          <MatchUpContainer>
            <TeamContainer>
              <TeamComponent>
                <BadgeImg src={homeTeamsrc} alt="home" />
                <HomeName>{homeTeamName}</HomeName>
              </TeamComponent>
              {match.status === "done" ? (
                <Score win={match.homeScore > match.awayScore}>
                  {match.homeScore}
                </Score>
              ) : match.status === "during" ? (
                <Score win={match.homeScore > match.awayScore}>
                  {match.homeScore}
                </Score>
              ) : (
                <Score />
              )}
            </TeamContainer>
            {match.status === "done" ? (
              <VersusComponent>-</VersusComponent>
            ) : match.status === "during" ? (
              <VersusComponent>-</VersusComponent>
            ) : (
              <VersusComponent>vs</VersusComponent>
            )}
            <TeamContainer>
              {match.status === "done" ? (
                <Score win={match.awayScore > match.homeScore}>
                  {match.awayScore}
                </Score>
              ) : match.status === "during" ? (
                <Score win={match.awayScore > match.homeScore}>
                  {match.awayScore}
                </Score>
              ) : (
                <Score />
              )}
              <TeamComponent>
                <BadgeImg src={awayTeamsrc} alt="away" />
                {awayTeamName}
              </TeamComponent>
            </TeamContainer>
          </MatchUpContainer>
          <MatchTimeComponent time={match.matchAt} status={match.status} />
        </MatchDetailComponent>
      </MatchDetailContainer>

      {match.status === "upcoming" ? (
        <div>경기 준비 중</div>
      ) : match.status === "during" ? (
        <div>경기 중</div>
      ) : match.status === "done" ? (
        <div>경기 종료</div>
      ) : (
        <div>시스템 점검 중</div>
      )}

      <div>홈 ? {match.home}</div>
      <div>
        {match.homeScore} : {match.awayScore}
      </div>
    </div>
  );
}

const MatchDetailTop = styled.div`
  font-weight: bold;
  padding: 0.3rem 0;
  display: flex;
  justify-content: left;
`;

const ToLeftImg = styled.img`
  width: 1rem;
  height: 1rem;
  margin-top: 0.1rem;
  margin-left: 1rem;
  margin-right: 0.7rem;
  &:hover {
    cursor: pointer;
  }
`;

const MatchDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;
`;

const MatchDetailComponent = styled.div`
  background-color: #f2f6fd;
  width: 358px;
  padding: 20px 0;
  border-radius: 8px;

  flex-direction: column;
  align-items: center;
  align-content: space-evenly;
  display: grid;
  gap: 20px;
`;

const MatchUpContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 0.1rem 0 0.1rem;
  padding: 0.5rem;
  height: 36px;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  font-weight: bold;
  color: #1a1a1a;
  margin: 0 0.1rem 0 0.1rem;
  padding: 1rem;
`;

const HomeName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #1a1a1a;
`;

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ win }) => (win ? "bold" : "normal")};

  color: #002266;
`;

const TeamComponent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0 0.1rem 0 0.1rem;
`;

const VersusComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0 0.1rem 0 0.1rem;
`;
