import React from "react";
import { useNavigate } from "react-router-dom";

import {
  MatchDetailTop,
  ToLeftImg,
  MatchDetailContainer,
  MatchDetailComponent,
  MatchUpContainer,
  TeamContainer,
  TeamComponent,
  HomeName,
  Score,
  VersusComponent,
} from "../../../styles/match-styles/detail/MatchDetailScoreStyles";

import MatchTimeComponent from "./MatchTimeComponent";
import { BadgeImg } from "../../../styles/match-styles/MatchDetailStyle";
import ToLeftPng from "../../../assets/ToLeft.png";

export default function MatchDetailScore({ match }) {
  match = {
    matchId: 201,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "울산 HD FC",
    awayTeamName: "포항스틸러스",
    matchAt: "2024-02-10T16:00:00",
    homeScore: 2,
    awayScore: 1,
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
        <div>{getFormattedDateString()}</div>
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
    </div>
  );
}
