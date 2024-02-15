import React from "react";
import {
  PredictionChartOuterContainer,
  PredictionChartInnerContainer,
  PredictBoxTitle,
  PredictBoxTitleComponent,
} from "../../../styles/match-styles/prediction/PredictionContainerStyles";

import { PredictBox } from "../../../styles/match-styles/MatchDetailStyle";
import PredictionComponent from "./PredictionComponent";

export default function PredictionContainer({ data }) {
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
        </PredictBoxTitleComponent>
      </div>

      <PredictionChartOuterContainer>
        <PredictionChartInnerContainer>
          <PredictionComponent
            teamName={homeTeamName}
            teamId={homeTeamId}
            bettingAmount={homeBettingAmount}
            totalBettingAmount={totalBettingAmount}
          />
        </PredictionChartInnerContainer>
        <PredictionChartInnerContainer>
          <PredictionComponent
            teamName={awayTeamName}
            teamId={awayTeamId}
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
