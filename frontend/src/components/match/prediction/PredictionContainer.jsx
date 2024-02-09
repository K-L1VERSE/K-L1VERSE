import React from "react";

import styled from "styled-components";
import { PredictBox } from "../../../styles/MatchStyles/MatchDetailStyle";
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

const PredictBoxTitleComponent = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
`;

const PredictBoxTitle = styled.div`
  font-family: "Pretendard-Bold";
  color: #002266;
  display: flex;
  div {
    margin-left: 0.3rem;
    margin-top: 0.05rem;
    font-size: 0.95rem;
  }
`;

const PredictBoxSubTitle = styled.div`
  margin-left: 1rem;
  font-size: 0.8rem;
  color: #595959;
`;

const PredictionChartOuterContainer = styled.div`
  justify-content: space-between;
  align-items: center;
`;

const PredictionChartInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #f4f4f4;
  color: #595959;
  font-family: "Pretendard-Bold";
  padding: 10px;
  img {
    margin-right: 0.2rem;
  }
  font-size: 0.95rem;
`;
