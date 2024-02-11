import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MatchDetailScore from "../../components/match/detail/MatchDetailScore";
import { getMatchDetail } from "../../api/match";
import PredictionContainer from "../../components/match/prediction/PredictionContainer";
import CurrentBettingContainer from "../../components/match/currentBetting/CurrentBettingContainer";
import DoBettingContainer from "../../components/match/doBetting/DoBettingContainer";

export default function MatchDetailPage() {
  // const { matchId } = useParams();
  const location = useLocation();
  const d = location.state?.d;
  const y = location.state?.y;
  const m = location.state?.m;
  const day = location.state?.day;
  const v = location.state?.v;

  // const [data, setData] = useState();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getMatchDetail(matchId)
  //       .then((result) => {
  //         setData(result);
  //       })
  //       .catch(() => {
  //         setData({
  //           status: "NONE",
  //         });
  //       });
  //   };
  //   fetchData();
  // }, []);

  const data = {
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamName: "울산 HD FC",
    awayTeamName: "포항스틸러스",
    homeBettingAmount: 40,
    awayBettingAmount: 100,
    drawBettingAmount: 60,
    matchAt: "2024-02-03T13:00:00",
    status: "done",
    homeScore: 1,
    awayScore: 2,
    home: "울산 문수",
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    style: {
      width: "99%",
    },
  };

  return (
    <div>
      {data && (
        <>
          <MatchDetailScore match={data} y={y} m={m} d={d} day={day} v={v} />
          {data.status !== "NONE" ? (
            <>
              <SliderContainer>
                <Slider {...settings}>
                  <PredictionContainer />
                  <CurrentBettingContainer />
                </Slider>
              </SliderContainer>
              <DoBettingContainer />
            </>
          ) : (
            <div />
          )}
        </>
      )}
    </div>
  );
}

const SliderContainer = styled.div`
  width: 94%;
  margin-top: 20px;
  .slick-dots {
    bottom: -30px;
  }
`;
