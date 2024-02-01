import React from "react";
import { useNavigate } from "react-router-dom";

export default function MatchDetailButton({ match }) {
  const navigate = useNavigate();

  const goMatchDetail = (matchId) => {
    navigate(`/matchDetail/${matchId}`);
  };

  return (
    <div
      onClick={() => goMatchDetail(match.matchId)}
      style={{ backgroundColor: "lime" }}
    >
      {match.homeTeamId} vs {match.awayTeamId}
      <div>{match.matchId}</div>
    </div>
  );
}
