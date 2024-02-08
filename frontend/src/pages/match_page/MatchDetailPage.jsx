import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const goChatting = (to) => {
    navigate(`/matchChatting/${to}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await getMatchDetail(matchId);
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <MatchDetailScore match={data} />
      <Slider dots={true}>
        <PredictionContainer match={data} />
        <CurrentBettingContainer match={data} />
      </Slider>
      <DoBettingContainer match={data} />
    </div>
  );
}
