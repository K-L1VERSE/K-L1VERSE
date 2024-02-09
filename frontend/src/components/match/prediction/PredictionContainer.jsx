import React from "react";

import {
  PredictionChartOuterContainer,
  PredictionChartInnerContainer,
  PredictBoxTitle,
  PredictBoxSubTitle,
  PredictBoxTitleComponent,
} from "../../../styles/match-styles/prediction/PredictionContainerStyles";

import { PredictBox } from "../../../styles/match-styles/MatchDetailStyle";
import PredictionComponent from "./PredictionComponent";

export default function PredictionContainer({ match }) {
  match = {
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "울산 HD FC",
    awayTeamName: "포항스틸러스",
    homeBettingAmount: 40,
    awayBettingAmount: 110,
    drawBettingAmount: 72,
    matchAt: "2024-02-03T13:00:00",
    status: "done",
    homeScore: 1,
    awayScore: 2,
    home: "울산 문수",
  };

  const { homeBettingAmount } = match;
  const { drawBettingAmount } = match;
  const { awayBettingAmount } = match;

  const totalBettingAmount =
    homeBettingAmount + drawBettingAmount + awayBettingAmount;

  return (
    <PredictBox>
      <div>
        <PredictBoxTitleComponent>
          <PredictBoxTitle>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Trophy.png"
              alt="Trophy"
              width="20"
              height="20"
            />
            <div>승부 예측 </div>
          </PredictBoxTitle>
          <PredictBoxSubTitle>
            {homeBettingAmount + drawBettingAmount + awayBettingAmount}참여
          </PredictBoxSubTitle>
        </PredictBoxTitleComponent>
      </div>

      <PredictionChartOuterContainer>
        <PredictionChartInnerContainer>
          <PredictionComponent
            teamName={match.homeTeamName}
            teamId={match.homeTeamId}
            bettingAmount={homeBettingAmount}
            totalBettingAmount={totalBettingAmount}
          />
        </PredictionChartInnerContainer>
        <PredictionChartInnerContainer>
          <PredictionComponent
            teamName={match.awayTeamName}
            teamId={match.awayTeamId}
            bettingAmount={awayBettingAmount}
            totalBettingAmount={totalBettingAmount}
          />
        </PredictionChartInnerContainer>
        <PredictionChartInnerContainer>
          <PredictionComponent
            teamName="무승부"
            bettingAmount={drawBettingAmount}
            totalBettingAmount={totalBettingAmount}
          />
        </PredictionChartInnerContainer>
      </PredictionChartOuterContainer>
    </PredictBox>
  );
}
