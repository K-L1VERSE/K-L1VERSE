import React, { useState, useEffect } from "react";
import { getMatchList } from "../../api/match";

export default function MatchScheduleContainer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const year = 2024;
      const month = 4;
      const result = await getMatchList(year, month);
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      MatchScheduleContainer
      <div>
        <table>
          <thead>
            <tr className="tableTitle">
              <td className="matchDate">경기일자</td>
              <td className="homeTeam">홈팀</td>
              <td className="awayTeam">원정팀</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="matchDate">{item.matchAt}</td>
                <td className="homeTeam">{item.homeTeamId}</td>
                <td className="awayTeam">{item.awayTeamId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
