import React from "react";
import {
  Container,
  CurrentBetTitleComponent,
  CurrentBetTitle,
  CurrentBettingOuterContainer,
  CurrentBettingInnerContainer,
} from "../../../styles/match-styles/currentBetting/CurrentBettingContainerStyles";

import CurrentBettingComponent from "./CurrentBettingComponent";

function CurrentBettingContainer({ data }) {
  const {
    homeBettingAmount,
    drawBettingAmount,
    awayBettingAmount,
    homeTeamName,
    awayTeamName,
    homeTeamId,
    awayTeamId,
  } = data;

  const totalBettingAmount =
    homeBettingAmount + drawBettingAmount + awayBettingAmount;

  let homeOdds = 0;
  let drawOdds = 0;
  let awayOdds = 0;
  if (homeBettingAmount > 0) {
    homeOdds = totalBettingAmount / homeBettingAmount;
  }
  if (drawBettingAmount > 0) {
    drawOdds = totalBettingAmount / drawBettingAmount;
  }
  if (awayBettingAmount > 0) {
    awayOdds = totalBettingAmount / awayBettingAmount;
  }
  const totalOdds = homeOdds + drawOdds + awayOdds;

  const homeOddsRatio = (homeOdds / totalOdds) * 100;
  const drawOddsRatio = (drawOdds / totalOdds) * 100;
  const awayOddsRatio = (awayOdds / totalOdds) * 100;

  return (
    <Container>
      <div>
        <CurrentBetTitleComponent>
          <CurrentBetTitle>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Bullseye.png"
              alt="Bullseye"
              width="20"
              height="20"
            />
            <div>현재 배율</div>
          </CurrentBetTitle>
        </CurrentBetTitleComponent>
      </div>

      <CurrentBettingOuterContainer>
        <CurrentBettingInnerContainer>
          <CurrentBettingComponent
            teamName={homeTeamName}
            teamId={homeTeamId}
            teamOddsRatio={homeOddsRatio}
            teamOdds={homeOdds}
          />
        </CurrentBettingInnerContainer>
        <CurrentBettingInnerContainer>
          <CurrentBettingComponent
            teamName={awayTeamName}
            teamId={awayTeamId}
            teamOddsRatio={awayOddsRatio}
            teamOdds={awayOdds}
          />
        </CurrentBettingInnerContainer>
        <CurrentBettingInnerContainer>
          <CurrentBettingComponent
            teamName="무승부"
            teamOddsRatio={drawOddsRatio}
            teamOdds={drawOdds}
          />
        </CurrentBettingInnerContainer>
      </CurrentBettingOuterContainer>
    </Container>
  );
}

export default CurrentBettingContainer;
