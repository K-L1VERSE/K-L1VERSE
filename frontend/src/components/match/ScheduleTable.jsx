import React, { useState } from "react";
import { TableContainer } from "../../styles/MatchStyles/MatchScheduleStyle";
import Time from "./Time";

export default function ScheduleTable({ year, month, data }) {
  const [selectedDay, setSelectedDay] = useState(null);

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
    <TableContainer>
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
                          onClick={() => setSelectedDay(dayData.day)}
                          className={`circle ${selectedDay === dayData.day ? "selected" : ""}`}
                        >
                          {dayData.day}
                        </div>
                      ) : (
                        <div onClick={() => setSelectedDay(null)}>
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
      <div className="info">
        <span>●</span> K-league 경기 일정
      </div>
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
              <div>
                <Time key={index} match={match} />
                <hr />
              </div>
            ))}
        </div>
      )}
    </TableContainer>
  );
}
