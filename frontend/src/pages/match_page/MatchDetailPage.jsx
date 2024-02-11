import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MatchDetailScore from "../../components/match/detail/MatchDetailScore";
import { getMatchDetail } from "../../api/match";
import PredictionContainer from "../../components/match/prediction/PredictionContainer";
import CurrentBettingContainer from "../../components/match/currentBetting/CurrentBettingContainer";
import DoBettingContainer from "../../components/match/doBetting/DoBettingContainer";

export default function MatchDetailPage() {
  const { matchId } = useParams();
  const location = useLocation();
  const d = location.state?.d;
  const y = location.state?.y;
  const m = location.state?.m;
  const day = location.state?.day;
  const v = location.state?.v;

  console.log("detail: ", y, m, d, day, v);

  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getMatchDetail(matchId);
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <>
          <MatchDetailScore match={data} y={y} m={m} d={d} day={day} v={v} />
          <Slider dots>
            <PredictionContainer />
            <CurrentBettingContainer />
          </Slider>
          <DoBettingContainer />
        </>
      )}
    </div>
  );
}
