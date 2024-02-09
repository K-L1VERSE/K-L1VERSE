import React from "react";
import {
  Container,
  CurrentBetTitleComponent,
  CurrentBetTitle,
  CurrentBettingOuterContainer,
  CurrentBettingInnerContainer,
} from "../../../styles/match-styles/currentBetting/CurrentBettingContainerStyles";

import CurrentBettingComponent from "./CurrentBettingComponent";

function CurrentBettingContainer({ match }) {
  const { homeBettingAmount } = match;
  const { drawBettingAmount } = match;
  const { awayBettingAmount } = match;

  const totalBettingAmount =
    homeBettingAmount + drawBettingAmount + awayBettingAmount;

  const homeOdds = totalBettingAmount / homeBettingAmount;
  const drawOdds = totalBettingAmount / drawBettingAmount;
  const awayOdds = totalBettingAmount / awayBettingAmount;
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
            teamName={match.homeTeamName}
            teamId={match.homeTeamId}
            teamOddsRatio={homeOddsRatio}
            teamOdds={homeOdds}
          />
        </CurrentBettingInnerContainer>
        <CurrentBettingInnerContainer>
          <CurrentBettingComponent
            teamName={match.awayTeamName}
            teamId={match.awayTeamId}
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
