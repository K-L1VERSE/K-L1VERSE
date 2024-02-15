import React from "react";
import {
  TodayMatchItemhWrap,
  Date,
  Teams,
  Team,
  Name,
  Score,
} from "../../styles/main-styles/TodayMatchStyle";

// ************ 날짜 yyyy-mm-dd 형태로 변환 ************
export function formatDate(date) {
  const d = new window.Date(date);

  const weekdays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const formattedDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)} ${weekdays[d.getDay()]} ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;

  return formattedDate;
}

function TodayMatchItem({ match, goMatchDetail }) {
  const homeTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.homeTeamId}.png`;
  const awayTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.awayTeamId}.png`;

  return (
    <TodayMatchItemhWrap onClick={goMatchDetail}>
      <Date>{formatDate(match.matchAt)}</Date>
      <Teams>
        <Team>
          <Name>
            <img src={homeTeamsrc} alt="homeTeam" />
            {match.homeTeamName}
          </Name>
          <Score winner={match.homeScore > match.awayScore}>
            {match.homeScore}
          </Score>
        </Team>
        <Team>
          <Name>
            <img src={awayTeamsrc} alt="awayTeam" />
            {match.awayTeamName}
          </Name>
          <Score winner={match.awayScore > match.homeScore}>
            {match.awayScore}
          </Score>
        </Team>
      </Teams>
    </TodayMatchItemhWrap>
  );
}

export default TodayMatchItem;
