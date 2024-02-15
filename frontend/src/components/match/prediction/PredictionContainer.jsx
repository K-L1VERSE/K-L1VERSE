import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMatchDetail } from "../../../api/match";
import {
  PredictionChartOuterContainer,
  PredictionChartInnerContainer,
  PredictBoxTitle,
  PredictBoxTitleComponent,
} from "../../../styles/match-styles/prediction/PredictionContainerStyles";

import { PredictBox } from "../../../styles/match-styles/MatchDetailStyle";
import PredictionComponent from "./PredictionComponent";

export default function PredictionContainer({ data }) {
  const { matchId } = useParams();

  // const [match, setMatch] = useState(null);
  // const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 값 추가

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getMatchDetail(matchId);
  //     setMatch(result);
  //     setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 설정
  //   };
  //   fetchData();
  // }, [matchId]);

  // if (isLoading) {
  //   return <div>Loading...</div>; // 로딩 중일 때는 'Loading...'을 표시
  // }

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
          {/* <PredictBoxSubTitle>
            {homeBettingAmount + drawBettingAmount + awayBettingAmount}참여
          </PredictBoxSubTitle> */}
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
