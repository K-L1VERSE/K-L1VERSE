import React from "react";

export default function BettingContainer({ match }) {
  return (
    <div>
      <div>
        <div>{match.homeTeamName}</div>
        <div>무승부</div>
        <div>{match.awayTeamName}</div>
      </div>
      <div>
        <div>승부예측</div>
        <div>{match.homeBettingAmount}</div>
        <div>{match.drawBettingAmount}</div>
        <div>{match.awayBettingAmount}</div>
      </div>
      <div>
        <div>현재배율</div>
        <div>{match.homeBettingAmount}</div>
        <div>{match.drawBettingAmount}</div>
        <div>{match.awayBettingAmount}</div>
      </div>
      <div>베팅하기</div>
      <button type="submit">{match.homeTeamName}</button>
      <button type="submit">무승부</button>
      <button type="submit">{match.awayTeamName}</button>
      <input type="number" /> 골 베팅하기
    </div>
  );
}
