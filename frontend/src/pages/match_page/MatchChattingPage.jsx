import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getMatchDetail } from "../../api/match";
import Chat from "../../components/match/Chat";
import ScoreItem from "../../components/match/ScoreItem";
import TimelineContainer from "../../components/match/TimelineContainer";
import BettingPercentItem from "../../components/match/BettingPercentItem";
import {
  Line,
  Buttons,
  Button,
} from "../../styles/match-styles/MatchTimelinStyle";
import { SurveyTop, ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";

function MatchChattingPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState({});
  const [focus, setFocus] = useState(1);
  const location = useLocation();
  const d = location.state?.d;
  const y = location.state?.y;
  const m = location.state?.m;
  const day = location.state?.day;
  const v = location.state?.v;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMatchDetail(matchId);
      setMatch(result);
    };
    fetchData();
  }, []);

  const goMatchDetail = () => {
    navigate(`/match/${matchId}`, {
      state: {
        d,
        y,
        m,
        day,
        v,
      },
    });
  };

  const clickBut = (id) => {
    setFocus(id);
  };

  return (
    <>
      <SurveyTop>
        <ToLeftImg src={ToLeftPng} onClick={goMatchDetail} />
      </SurveyTop>
      <BettingPercentItem match={match} />
      <Line />
      <Buttons>
        <Button $focus={focus === 1} onClick={() => clickBut(1)}>
          ⚽ 타임라인
        </Button>
        <Button $focus={focus === 2} onClick={() => clickBut(2)}>
          👀 실시간 채팅
        </Button>
      </Buttons>
      <ScoreItem match={match} />
      {focus === 1 && <TimelineContainer match={match} setMatch={setMatch} />}
      {focus === 2 && <Chat />}
    </>
  );
}

export default MatchChattingPage;
