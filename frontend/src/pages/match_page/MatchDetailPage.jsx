import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MatchDetailScore from "../../components/match/MatchDetailScore";
import { getMatchDetail } from "../../api/match";
import BettingContainer from "../../components/match/BettingContainer";

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
      <button type="button" onClick={() => goChatting(matchId)}>
        경기 채팅 입장하기 ~~
      </button>
      <BettingContainer match={data} />
    </div>
  );
}
