import React, { useState, useEffect } from "react";
import TodayMatchItem from "./TodayMatchItem";
import { getTodayMatch } from "../../api/match";
import { TodayMatchWarp } from "../../styles/main-styles/TodayMatchStyle";

function TodayMatch() {
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
    <TodayMatchWarp>
      {matches.map((match) => (
        <TodayMatchItem match={match} />
      ))}
    </TodayMatchWarp>
  );
}

export default TodayMatch;
