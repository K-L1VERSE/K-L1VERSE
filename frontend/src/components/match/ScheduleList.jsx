import React from "react";
import MatchDetailButton from "./MatchDetailButtton";

export default function ListContainer({ data }) {
  // 데이터를 날짜별로 그룹화
  const groupedData = data.reduce((acc, match) => {
    const date = new Date(match.matchAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedData).map(([date, matches]) => (
        <div key={date}>
          <h2>
            {date.replace(".", "년 ").replace(".", "월 ").replace(".", "일 ")}
          </h2>
          {matches.map((match, index) => (
            <div key={index}>
              <h2>
                {new Date(match.matchAt).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h2>
              <p>
                {match.team1} vs {match.team2}
              </p>
              <MatchDetailButton match={match} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
