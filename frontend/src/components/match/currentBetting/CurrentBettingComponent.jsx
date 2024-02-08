import React from "react";

import styled, { keyframes } from "styled-components";

import { BadgeImg } from "../../../styles/MatchStyles/MatchDetailStyle";

function CurrentBettingComponent({
  teamName,
  teamId,
  teamOddsRatio,
  teamOdds,
}) {
  const teamsrc = `${process.env.PUBLIC_URL}/badge/badge${teamId}.png`;

  let parsedTeamName = teamName.substring(0, 2);

  if (`${teamName}`.includes("서울") || `${teamName}`.includes("수원")) {
    parsedTeamName = `${teamName}`.substring(0, 4);
  } else if (`${teamName}`.includes("무승부")) {
    parsedTeamName = "무승부";
  }

  const fixedTeamOdds = teamOdds.toFixed(1);
  return (
    <TeamContainer>
      <TeamNameContainer>
        <TeamNameComponent>
          {parsedTeamName === "무승부" ? (
            <div />
          ) : (
            <BadgeImg src={teamsrc} alt="home" />
          )}
          <TeamName>{parsedTeamName}</TeamName>
        </TeamNameComponent>
      </TeamNameContainer>
      <TeamBettingContainer>
        <CurrentBettingBar ratio={teamOddsRatio}>
          <TeamBettingText>X {fixedTeamOdds}</TeamBettingText>
        </CurrentBettingBar>
      </TeamBettingContainer>
    </TeamContainer>
  );
}

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  gap: 30px;
`;

const TeamNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  width: 90px;
  height: 40px;
`;

const TeamNameComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamBettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  width: 100%;
`;

const TeamName = styled.div`
  font-weight: bold;
  color: #222222;
`;

const TeamBettingText = styled.div`
  display: flex;
  justify-content: center;

  color: #ffffff;
  font-weight: bold;
  font-size: 0.8rem;
`;

const fillAnimation = (ratio) => keyframes`
  from {
    width: 100%;
  }
  to {
    width: ${ratio}%;
  }
`;

const CurrentBettingBar = styled.div`
  width: 100%;
  animation: ${({ ratio }) => fillAnimation(ratio)} 3.5s ease-out forwards;
  height: 30px;
  background-color: #3261c1;

  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CurrentBettingComponent;
