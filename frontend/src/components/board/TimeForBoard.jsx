import React from "react";
import styled from "styled-components";
import { BadgeImg } from "../../styles/match-styles/MatchScheduleStyle";

export default function TimeForBoard({
  match,
  onMatchClick,
  selectedMatchId,
  setSelectedMatch,
  type,
}) {
  const handleOnClick = () => {
    if (onMatchClick) {
      onMatchClick(match.matchId);
      if (type === "regist") {
        setSelectedMatch(match);
      }
    }
  };

  const srcFirst = `${process.env.PUBLIC_URL}/badge/badge`;

  let homeTeamName = `${match.homeTeamName}`.substring(0, 2);
  let awayTeamName = `${match.awayTeamName}`.substring(0, 2);
  if (
    `${match.homeTeamName}`.includes("서울") ||
    `${match.homeTeamName}`.includes("수원")
  ) {
    homeTeamName = `${match.homeTeamName}`.substring(0, 4);
  }
  if (
    `${match.awayTeamName}`.includes("서울") ||
    `${match.awayTeamName}`.includes("수원")
  ) {
    awayTeamName = `${match.awayTeamName}`.substring(0, 4);
  }

  return (
    <OnlyTime2 $isClicked={selectedMatchId === match.matchId}>
      <div className="time" onClick={handleOnClick}>
        <div>
          {new Date(match.matchAt).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className="timeBottom">
          <div className="team">
            <div>
              <BadgeImg
                src={`${srcFirst}${match.homeTeamId}.png`}
                alt="homeTeamImg"
              />
              {homeTeamName}
            </div>
            <div>vs</div>
            <div>
              <BadgeImg
                src={`${srcFirst}${match.awayTeamId}.png`}
                alt="awayTeamImg"
              />
              {awayTeamName}
            </div>
          </div>
        </div>
      </div>
    </OnlyTime2>
  );
}

export const OnlyTime2 = styled.div`
  .time {
    height: 4rem;
    border-bottom: 2px solid #f4f4f4;
    font-size: 0.8rem;
    padding-top: 0.5rem;
    font-family: "Pretendard-Regular";

    &:hover {
      cursor: pointer;
    }
  }
  .time:last-child {
    border-bottom: none;
  }

  .timeBottom {
    display: flex;
    width: 95%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    font-family: "Pretendard-Regular";
  }
  .team {
    display: flex;
    justify-content: space-between;
    padding: 0rem 1rem;
    width: 100%;
  }
  .team div {
    display: flex;
    align-items: center;
    padding: 0.2rem;
    height: 1.5rem;
  }
  .team div img {
    margin-right: 0.6rem;
  }

  background-color: ${(props) => (props.$isClicked ? "#f2f6fd" : "none")};
`;
