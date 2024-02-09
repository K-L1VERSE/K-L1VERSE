import React from "react";
import {
  PercentBox,
  Percent,
  PercentItem,
  TeamItem,
  Text,
  PercentItems,
} from "../../styles/match-styles/MatchTimelinStyle";

export default function BettingPercentItem({ match }) {
  const homeTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.homeTeamId}.png`;
  const awayTeamsrc = `${process.env.PUBLIC_URL}/badge/badge${match.awayTeamId}.png`;

  const totalBettingAmount =
    match.homeBettingAmount + match.drawBettingAmount + match.awayBettingAmount;

  let homeOdds = totalBettingAmount / match.homeBettingAmount;
  let drawOdds = totalBettingAmount / match.drawBettingAmount;
  let awayOdds = totalBettingAmount / match.awayBettingAmount;

  if (totalBettingAmount === 0) {
    homeOdds = 0;
    drawOdds = 0;
    awayOdds = 0;
  }

  const totalOdds = homeOdds + drawOdds + awayOdds;
  const homeOddsRatio = (homeOdds / totalOdds) * 100;
  const drawOddsRatio = (drawOdds / totalOdds) * 100;
  const awayOddsRatio = (awayOdds / totalOdds) * 100;

  return (
    <PercentBox>
      <Text>오늘의 우승 팀은 누가 될까요?</Text>
      <PercentItems>
        <PercentItem width={homeOddsRatio}>
          <TeamItem>
            <img src={homeTeamsrc} alt="" />
            {match.homeTeamName}
          </TeamItem>
          <Percent type="home">X {Math.round(homeOdds * 100) / 100}</Percent>
        </PercentItem>
        <PercentItem width={drawOddsRatio}>
          <TeamItem>무승부</TeamItem>
          <Percent type="draw">X {Math.round(drawOdds * 100) / 100}</Percent>
        </PercentItem>
        <PercentItem width={awayOddsRatio}>
          <TeamItem>
            <img src={awayTeamsrc} alt="" />
            {match.awayTeamName}
          </TeamItem>
          <Percent type="away">X {Math.round(awayOdds * 100) / 100}</Percent>
        </PercentItem>
      </PercentItems>
    </PercentBox>
  );
}
