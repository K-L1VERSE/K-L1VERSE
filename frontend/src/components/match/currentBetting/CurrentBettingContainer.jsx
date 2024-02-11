import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMatchDetail } from "../../../api/match";
import {
  Container,
  CurrentBetTitleComponent,
  CurrentBetTitle,
  CurrentBettingOuterContainer,
  CurrentBettingInnerContainer,
} from "../../../styles/match-styles/currentBetting/CurrentBettingContainerStyles";

import CurrentBettingComponent from "./CurrentBettingComponent";

function CurrentBettingContainer() {
  const { matchId } = useParams();

  const [match, setMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 값 추가

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMatchDetail(matchId);
      setMatch(result);
      setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
    };
    fetchData();
  }, [matchId]);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때는 'Loading...'을 표시
  }

  const { homeBettingAmount, drawBettingAmount, awayBettingAmount } = match;

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
