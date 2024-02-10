import React from "react";
import { ListStyle } from "../../styles/match-styles/MatchScheduleStyle";
import Time from "./Time";

export default function ListContainer({ data, year, month, view }) {
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
    <ListStyle>
      <table>
        <tbody>
          {Object.entries(groupedData).map(([date, matches]) => (
            <tr key={date}>
              <td className="date">
                {date
                  .split(" ")
                  .map((part, index) => {
                    if (index === 2) return part.replace(".", "");
                    return part;
                  })
                  .join(" ")}
              </td>
              <td className="detail">
                {matches.flatMap((match, index, array) => (
                  <React.Fragment key={index}>
                    <Time
                      match={match}
                      data={data}
                      year={year}
                      month={month}
                      view={view}
                    />
                    {index < array.length - 1 && <hr />}
                  </React.Fragment>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListStyle>
  );
}
