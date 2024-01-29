import React, { useState, useEffect } from "react";
import TodayMatchItem from "./TodayMatchItem";
import { getTodayMatch } from "../../api/match";

function TodayMatch() {
  const data = [
    {
      date: "2024-01-26 12:09:52.958218",
      homeTeamId: "1",
      awayTeamId: "3",
      homeTeamName: "김포 FC",
      awayTeamName: "경남",
      homeScore: "2",
      awayScore: "1",
    },
    {
      date: "2024-01-26 12:09:52.958218",
      homeTeamId: "2",
      awayTeamId: "10",
      homeTeamName: "김포 FC",
      awayTeamName: "경남",
      homeScore: "1",
      awayScore: "3",
    },
  ];

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // get today match
    getTodayMatch(({ data }) => {
      setMatches(data);
    }),
      (error) => {
        console.error(error);
      };
  }, []);

  return (
    <div>
      {data.map((match) => (
        <TodayMatchItem match={match} />
      ))}
    </div>
  );
}

export default TodayMatch;
