import React from "react";
import {
  TeamContainer,
  TeamNameContainer,
  TeamNameComponent,
  TeamBettingContainer,
  TeamName,
  TeamBettingText,
  CurrentBettingBar,
} from "../../../styles/match-styles/currentBetting/CurrentBettingComponentStyles";

import { BadgeImg } from "../../../styles/match-styles/MatchDetailStyle";

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

export default CurrentBettingComponent;
