import React from "react";
import styled from "styled-components";
import {
  ScheduleSelect,
  ArrowImg,
} from "../../../styles/match-styles/MatchScheduleStyle";
import ToLeft from "../../../assets/ToLeft.png";
import ToRight from "../../../assets/ToRight.png";

export default function SelectContainer2({
  year,
  setYear,
  month,
  setMonth,
  resetDay,
}) {
  const years = [2024, 2025];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
    resetDay();
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
    resetDay();
  };

  return (
    <ScheduleSelect2>
      <ArrowImg src={ToLeft} onClick={handlePrevMonth} />
      <div>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <ArrowImg src={ToRight} onClick={handleNextMonth} />
    </ScheduleSelect2>
  );
}

export const ScheduleSelect2 = styled.div`
  padding: 6px 6px 0px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  select {
    width: 70px;
    height: 30px;
    text-align: center;
    font-size: 1rem;
    font-family: "Pretendard-Bold";
    border: none;
    outline: none;
  }
`;
