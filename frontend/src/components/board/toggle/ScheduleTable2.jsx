import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Time from "../../match/Time";
import TimeForBoard from "../TimeForBoard";

export default function ScheduleTable({
  year,
  month,
  day,
  setResetDayFlag,
  setSelectedDayProps,
  data,
  view,
  isMateListPage,
  onMatchClick,
  selectedMatchId,
  setSelectedMatch,
}) {
  const [selectedDay, setSelectedDay] = useState(day);

  useEffect(() => {
    setSelectedDay(day);
    setResetDayFlag(false);
  }, [day]);

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const groupedData = days.map((day) => ({
    day,
    matches: data.filter((item) => new Date(item.matchAt).getDate() === day),
  }));

  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const lastDayOfWeek = new Date(year, month - 1, daysInMonth).getDay();

  const weeks = [];
  const emptyDaysBefore = Array.from({ length: firstDayOfWeek }, () => null);
  const emptyDaysAfter = Array.from({ length: 6 - lastDayOfWeek }, () => null);
  const allDays = [...emptyDaysBefore, ...groupedData, ...emptyDaysAfter];

  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  return (
    <TableContainer2>
      <table>
        <tbody>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
          {weeks.map((week, weekIndex) => (
            <tr key={`${weekIndex}-days`}>
              {week.map((dayData, dayIndex) =>
                dayData ? (
                  <td key={dayIndex}>
                    <div>
                      {dayData.matches.length > 0 ? (
                        <div
                          onClick={() => {
                            setSelectedDay(dayData.day);
                            setSelectedDayProps(dayData.day);
                          }}
                          className={`circle ${selectedDay === dayData.day ? "selected" : ""}`}
                        >
                          {dayData.day}
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setSelectedDay(null);
                            setSelectedDayProps(null);
                          }}
                        >
                          {dayData.day}
                        </div>
                      )}
                    </div>
                  </td>
                ) : (
                  <td key={dayIndex}></td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDay && (
        <div>
          <div className="nothing" />
          <div className="dateInfo">
            {new Date(year, month - 1, selectedDay).toLocaleDateString(
              "ko-KR",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "long",
              },
            )}
          </div>
          <hr />
          {groupedData
            .find((dayData) => dayData.day === selectedDay)
            .matches.map((match, index) => (
              <div key={index}>
                {isMateListPage ? (
                  <TimeForBoard
                    match={match}
                    onMatchClick={onMatchClick}
                    selectedMatchId={selectedMatchId}
                    setSelectedMatch={setSelectedMatch}
                  />
                ) : (
                  <Time
                    match={match}
                    data={data}
                    year={year}
                    month={month}
                    day={selectedDay}
                    view={view}
                  />
                )}
                <hr />
              </div>
            ))}
        </div>
      )}
    </TableContainer2>
  );
}

export const TableContainer2 = styled.div`
  text-align: center;
  table {
    margin: 0 auto;
    width: 95%;
    max-width: 80rem;
    table-layout: fixed;
    tr {
      height: 3rem;
      font-size: 0.8rem;
    }

    .circle {
      width: 1.7rem;
      height: 2rem;
      border-radius: 20px;
      background-color: #f2f6fd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-family: "Pretendard-Bold";
      color: #002266;
      margin: 0 auto;

      &:hover {
        cursor: pointer;
      }
    }
    .circle.selected {
      background-color: #002266;
      color: white;
    }
  }
  .info {
    text-align: right;
    padding-right: 1.5rem;
    padding-bottom: 1rem;
    color: #002266;
    font-size: 0.9rem;
    }
  }
  .nothing {
    background-color: #f4f4f4;
    width: 100%;
    height: 0.625rem;
  }
  .dateInfo {
    text-align: left;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    margin-top: 1rem;
    font-size: 0.9rem;
    font-family: "Pretendard-Bold";
    color: #002266;
  }
  hr {
    border: none;
    width: 95%;
    border-top: 1px solid #f4f4f4;
  }
`;
