import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodayMatchItem from "./TodayMatchItem";
import { getTodayMatch } from "../../api/match";
import { NoMatchText } from "../../styles/main-styles/TodayMatchStyle";

function TodayMatch() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getTodayMatch((res) => {
      if (res && res.data) {
        setMatches(res.data);
      }
    }),
      () => {};
  }, []);

  const navigate = useNavigate();

  const goMatchDetail = (matchId) => {
    navigate(`/match/${matchId}`);
  };
  return (
    <>
      {matches.length === 0 && (
        <NoMatchText>오늘 예정된 경기가 없습니다.</NoMatchText>
      )}
      {matches.map((match) => (
        <TodayMatchItem match={match} goMatchDetail={goMatchDetail} />
      ))}
    </>
  );
}

export default TodayMatch;
