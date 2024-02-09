import React from "react";
import { TableContainer } from "../../styles/match-styles/MatchScheduleStyle";
import MatchDetailButton from "./MatchDetailButtton";

export default function ScheduleTable({ year, month, data }) {
  // 해당 월의 모든 날짜를 배열로 생성
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 날짜별로 경기 일정 그룹화
  const groupedData = days.map((day) => ({
    day,
    matches: data.filter((item) => new Date(item.matchAt).getDate() === day),
  }));

  // 월의 첫 날의 요일과 마지막 날의 요일을 계산
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const lastDayOfWeek = new Date(year, month - 1, daysInMonth).getDay();

  // 각 주간의 경기 일정을 그룹화
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
          <tr style={{ backgroundColor: "lightblue" }}>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
          {weeks.map((week, weekIndex) => (
            <>
              <tr key={`${weekIndex}-days`}>
                {/* 날짜 행 */}
                {week.map((dayData, dayIndex) =>
                  dayData ? (
                    <td key={dayIndex} style={{ backgroundColor: "green" }}>
                      {dayData.day}
                    </td>
                  ) : (
                    <td key={dayIndex}></td>
                  ),
                )}
              </tr>
              <tr key={`${weekIndex}-matches`}>
                {/* 경기 일정 행 */}
                {week.map((dayData, dayIndex) =>
                  dayData ? (
                    <td key={dayIndex}>
                      {dayData.matches.length > 0 ? (
                        dayData.matches.map((match, matchIndex) => (
                          <div>
                            <MatchDetailButton match={match} />
                          </div>
                        ))
                      ) : (
                        <div>X</div>
                      )}
                    </td>
                  ) : (
                    <td key={dayIndex}></td>
                  ),
                )}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
}
