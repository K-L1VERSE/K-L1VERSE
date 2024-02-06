import React, { useState, useEffect } from "react";
import TodayMatchItem from "./TodayMatchItem";
import { getTodayMatch } from "../../api/match";
import { NoMatchText } from "../../styles/main-styles/TodayMatchStyle";

function TodayMatch() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getTodayMatch(({ data }) => {
      setMatches(data);
    }),
      () => {};
  }, []);

  return (
    <>
      {matches.length === 0 && (
        <NoMatchText>오늘 예정된 경기가 없습니다.</NoMatchText>
      )}
      {matches.map((match) => (
        <TodayMatchItem match={match} />
      ))}
    </>
  );
}

export default TodayMatch;
