import React from "react";

import styled from "styled-components";

import { BadgeImg } from "../../../styles/MatchStyles/MatchDetailStyle";
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
          {((bettingAmount / totalBettingAmount) * 100).toFixed(0)}%
        </PredictionRatio>
        <PredictionBar
          ratio={((bettingAmount / totalBettingAmount) * 100).toFixed(0)}
        />
      </TeamBettingContainer>
    </TeamContainer>
  );
}

const TeamContainer = styled.div`
  //컨텐츠 양옆으로 정렬
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 10px 15px 10px 10px;
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
  flex-direction: row;
  align-items: start;
  justify-content: center;

  gap: 10px;

  //세로로 중앙 정렬
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamName = styled.div`
  font-weight: bold;
  color: #222222;
`;

const PredictionAmount = styled.div`
  font-size: 0.8rem;
  color: #595959;
`;

const PredictionRatio = styled.div`
  font-weight: bold;
  color: #3261c1;
`;

export default PredictionComponent;
