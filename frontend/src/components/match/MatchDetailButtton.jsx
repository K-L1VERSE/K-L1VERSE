import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeImg,
  MatchInfo,
} from "../../styles/MatchStyles/MatchScheduleStyle";

export default function MatchDetailButton({ match }) {
  const navigate = useNavigate();

  const goMatchDetail = (matchId) => {
    navigate(`/match/${matchId}`);
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

  return (
    <div>
      <MatchInfo onClick={() => goMatchDetail(match.matchId)}>
        <BadgeImg src={homeTeamsrc} alt="homeTeam" />
        {`${match.status}` === "upcoming"
          ? "경기 전"
          : `${match.homeScore} : ${match.awayScore}`}
        <BadgeImg src={awayTeamsrc} alt="awayTeam" />
        <div>
          {homeTeamName} vs {awayTeamName}
        </div>
      </MatchInfo>
    </div>
  );
}
