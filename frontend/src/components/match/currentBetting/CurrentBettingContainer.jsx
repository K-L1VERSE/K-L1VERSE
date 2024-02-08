import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { UserState } from "../../../global/UserState";
import * as bettingApi from "../../../api/betting";

import { PercentBox } from "../../../styles/MatchStyles/MatchDetailStyle";
import CurrentBettingComponent from "./CurrentBettingComponent";

function CurrentBettingContainer({ match }) {
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

  const [userState] = useRecoilState(UserState);
  const { matchId } = useParams();
  const [betComplete, setBetComplete] = useState(false);

  useEffect(() => {
    const checkBetting = async () => {
      const response = await bettingApi.checkBetting({
        matchId,
        userId: userState.userId,
      });
      // response.data === 0 : 아직 베팅 안함
      // response.data === 1 : 이미 베팅함
      if (response.data === 0) {
        console.log(`베팅 아직 안했음 : ${response.data}`);
      } else {
        setBetComplete(true);
        console.log(`이미 베팅했음 : ${response.data}`);
      }
    };

    checkBetting();
  }, [matchId, userState.userId]);

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
  const [selectedTeam, setSelectedTeam] = useState(null); // 'home', 'draw', 'away'
  const [bettingAmount, setBettingAmount] = useState(0);

  const handleTeamClick = (team) => {
    setSelectedTeam(selectedTeam === team ? null : team); // 기존에 선택된 팀이면 선택 해제, 아니면 선택
  };

  return (
    <PercentBox>
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
    </PercentBox>
  );
}

const CurrentBettingOuterContainer = styled.div`
  justify-content: space-between;
  align-items: center;
`;

const CurrentBettingInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #f4f4f4;
  color: #595959;
  padding: 10px;
  font-family: "Pretendard-Bold";
  font-size: 0.95rem;
  img {
    margin-right: 0.3rem;
  }
`;

const CurrentBetTitleComponent = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
  font-size: 0.95rem;
`;

const CurrentBetTitle = styled.div`
  font-family: "Pretendard-Bold";
  color: #002266;
  display: flex;
  div {
    margin-left: 0.3rem;
    margin-top: 0.1rem;
  }
`;

export default CurrentBettingContainer;
