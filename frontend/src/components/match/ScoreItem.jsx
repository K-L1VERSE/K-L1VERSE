import React from "react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getMatchDetail } from "../../api/match";
import {
  ScoreWrap,
  ScoreInner,
  Team,
  TeamName,
  Score,
} from "../../styles/MatchStyles/MatchTimelinStyle";

export default function ScoreContainer() {
  // const { matchId } = useParams();
  // const [match, setMatch] = useState({
  //   homeTeamName: "",
  //   awayTeamName: "",
  //   homeScore: 0,
  //   awayScore: 0,
  // });

  const match = {
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "FC 서울",
    awayTeamName: "수원 FC",
    homeScore: 2,
    awayScore: 1,
  };

  const homeTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.homeTeamId}.png`;
  const awayTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.awayTeamId}.png`;

  // useEffect(() => {
  //   setMatch(getMatchDetail(matchId));
  // }, []);

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
