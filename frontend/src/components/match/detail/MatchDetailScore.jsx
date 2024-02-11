import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

export default function MatchDetailScore({ match, y, m, day, d, v }) {
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
    if (v === "list") {
      navigate("/schedule", { state: { d, y, m, v } });
    } else if (v === "calendar") {
      navigate("/schedule", { state: { d, y, m, day, v } });
    }
    // navigate(-1);
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
            <MatchUpComponent>
              <TeamContainer>
                <TeamComponent>
                  <BadgeImg src={homeTeamsrc} alt="home" />
                  <HomeName>{homeTeamName}</HomeName>
                </TeamComponent>
                {match.status === "done" ? (
                  <Score $win={match.homeScore > match.awayScore}>
                    {match.homeScore}
                  </Score>
                ) : match.status === "during" ? (
                  <Score $win={match.homeScore > match.awayScore}>
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
                  <Score $win={match.awayScore > match.homeScore}>
                    {match.awayScore}
                  </Score>
                ) : match.status === "during" ? (
                  <Score $win={match.awayScore > match.homeScore}>
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
            </MatchUpComponent>

            <StadiumComponent>
              <StadiumText>{match.home}</StadiumText>
            </StadiumComponent>
          </MatchUpContainer>
          <MatchTimeComponent
            time={match.matchAt}
            status={match.status}
            y={y}
            m={m}
            day={day}
            d={d}
            v={v}
          />
        </MatchDetailComponent>
      </MatchDetailContainer>
    </div>
  );
}

const MatchUpComponent = styled.div`
  display: flex;
  margin: 0 auto;
  width: 90%;
  justify-content: space-around;
  padding: 0.5rem;
  height: 36px;
  background-color: white;
  border-radius: 5px;
`;

const StadiumComponent = styled.div`
  margin: 0 auto;
  display: flex;
  width: 90%;
  justify-content: space-around;
  margin-bottom: 0.5rem;
`;

const StadiumText = styled.div`
  font-size: 0.8rem;
  color: #666666;
`;
