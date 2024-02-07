import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
      <PredictionContainer match={data} />
      <CurrentBettingContainer match={data} />
      <DoBettingContainer match={data} />
    </div>
  );
}
