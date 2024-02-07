import React from "react";
// import MatchDetailButton from "./MatchDetailButtton";

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
        <div key={date} style={{ border: "2px solid blue" }}>
          <div>
            {date.replace(".", "년 ").replace(".", "월 ").replace(".", "일 ")}
          </div>
          {matches.map((match, index) => (
            <div key={index} style={{ border: "2px solid pink" }}>
              <div>
                {new Date(match.matchAt).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                <div>
                  {match.homeTeamName} : {match.homeScore}
                </div>
                <div>
                  {match.awayTeamName} : {match.awayScore}
                </div>
              </div>
              <div>
                {match.status === "upcoming"
                  ? "경기 예정"
                  : match.status === "during"
                    ? "경기 중"
                    : "경기 종료"}
              </div>
              {/* <MatchDetailButton match={match} /> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
