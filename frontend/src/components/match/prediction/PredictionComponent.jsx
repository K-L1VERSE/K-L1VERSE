import React from "react";

import {
  TeamContainer,
  TeamNameContainer,
  TeamNameComponent,
  TeamBettingContainer,
  TeamName,
  PredictionAmount,
  PredictionRatio,
} from "../../../styles/match-styles/prediction/PredictionComponentStyles";

import { BadgeImg } from "../../../styles/match-styles/MatchDetailStyle";
import PredictionBar from "./PreditionBar";

function PredictionComponent({
  teamName,
  teamId,
  bettingAmount,
  totalBettingAmount,
}) {
  const teamsrc = `${process.env.PUBLIC_URL}/badge/badge${teamId}.png`;

  let parsedTeamName = teamName.substring(0, 2);

  if (`${teamName}`.includes("서울") || `${teamName}`.includes("수원")) {
    parsedTeamName = `${teamName}`.substring(0, 4);
  } else if (`${teamName}`.includes("무승부")) {
    parsedTeamName = "무승부";
  }

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
        <PredictionAmount>
          {bettingAmount}/{totalBettingAmount}
        </PredictionAmount>
        <PredictionRatio>
          {totalBettingAmount === 0
            ? 0
            : ((bettingAmount / totalBettingAmount) * 100).toFixed(0)}
          %
        </PredictionRatio>
        <PredictionBar
          ratio={((bettingAmount / totalBettingAmount) * 100).toFixed(0)}
        />
      </TeamBettingContainer>
    </TeamContainer>
  );
}

export default PredictionComponent;
