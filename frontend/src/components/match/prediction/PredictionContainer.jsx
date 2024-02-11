import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMatchDetail } from "../../../api/match";
import {
  PredictionChartOuterContainer,
  PredictionChartInnerContainer,
  PredictBoxTitle,
  PredictBoxSubTitle,
  PredictBoxTitleComponent,
} from "../../../styles/match-styles/prediction/PredictionContainerStyles";

import { PredictBox } from "../../../styles/match-styles/MatchDetailStyle";
import PredictionComponent from "./PredictionComponent";

export default function PredictionContainer() {
  // const { matchId } = useParams();

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

  const match = {
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "울산 HD FC",
    awayTeamName: "포항스틸러스",
    homeBettingAmount: 0,
    awayBettingAmount: 0,
    drawBettingAmount: 0,
    matchAt: "2024-02-03T13:00:00",
    status: "done",
    homeScore: 1,
    awayScore: 2,
    home: "울산 문수",
  };

  const {
    homeBettingAmount,
    drawBettingAmount,
    awayBettingAmount,
    homeTeamName,
    awayTeamName,
    homeTeamId,
    awayTeamId,
  } = match;

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
