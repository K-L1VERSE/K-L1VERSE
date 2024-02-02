import React from "react";
import { BadgeImg } from "../../styles/MatchStyles/MatchDetailStyle";

export default function MatchDetailScore({ match }) {
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

  return (
    <div>
      <div>언제 ? {match.matchAt}</div>
      <div>홈 ? {match.home}</div>
      <div>
        <BadgeImg src={homeTeamsrc} alt="homeTeam" />
        {match.homeScore} : {match.awayScore}
        <BadgeImg src={awayTeamsrc} alt="awayTeam" />
      </div>
      <div>
        {homeTeamName} vs {awayTeamName}
      </div>
    </div>
  );
}
