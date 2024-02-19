import React, { useState, useEffect } from "react";
import {
  ScoreWrap,
  ScoreInner,
  Team,
  TeamName,
  Score,
} from "../../styles/match-styles/MatchTimelinStyle";

export default function ScoreContainer({ match }) {
  const homeTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.homeTeamId}.png`;
  const awayTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.awayTeamId}.png`;

  return (
    <ScoreWrap>
      <ScoreInner>
        <Team>
          <img src={homeTeamsrc} alt="home" />
          <div>{match.homeTeamName}</div>
        </Team>
        <Score>
          {match.homeScore} - {match.awayScore}
        </Score>
        <Team>
          <TeamName>{match.awayTeamName}</TeamName>
          <img src={awayTeamsrc} alt="away" />
        </Team>
      </ScoreInner>
    </ScoreWrap>
  );
}
