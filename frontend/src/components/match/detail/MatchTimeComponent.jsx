import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TimeContainer,
  TimeComponent,
  DoneComponent,
  DuringComponent,
  DuringText,
} from "../../../styles/match-styles/detail/MatchTimeComponentStyles";

function MatchTimeComponent({ time, status, y, m, day, d, v }) {
  const { matchId } = useParams();

  const targetTIme = new Date(time);
  const currentTime = new Date();
  const timeDifferenceInMinues = Math.floor((targetTIme - currentTime) / 1000);

  const [remainingTime, setRemainingTime] = useState(timeDifferenceInMinues);
  const [matchStatus, setMatchStatus] = useState(status);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (
      remainingTime <= 0 &&
      matchStatus !== "during" &&
      matchStatus !== "done"
    ) {
      setMatchStatus("during");
    }

    return () => clearTimeout(timer);
  }, [remainingTime, matchStatus]);

  const Dday = Math.floor(timeDifferenceInMinues / 3600 / 24);
  const Dhour = Math.floor((timeDifferenceInMinues / 3600) % 24);
  const Dminute = Math.floor((timeDifferenceInMinues / 60) % 60);

  const navigate = useNavigate();
  const enterMatch = (to) => {
    if (status !== "done") {
      navigate(`/chat/${to}`, {
        state: {
          d,
          y,
          m,
          day,
          v,
        },
      });
    }
  };

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return { minutes, seconds };
  };

  const { minutes, seconds } = formatTime(remainingTime);

  return (
    <TimeContainer onClick={() => enterMatch(matchId)}>
      {matchStatus === "done" ? (
        <DoneComponent>경기 종료</DoneComponent>
      ) : matchStatus === "during" ? (
        <DuringComponent>
          <DuringText>경기 입장하기</DuringText>
        </DuringComponent>
      ) : Dday > 0 ? (
        <TimeComponent>
          <DuringText>
            경기 시작 {Dday}일 {Dhour}시간 {Dminute}분 전
          </DuringText>
        </TimeComponent>
      ) : Dday === 0 && Dhour > 0 ? (
        <TimeComponent>
          <DuringText>
            경기 시작 {Dhour}시간 {Dminute}분 전
          </DuringText>
        </TimeComponent>
      ) : Dday === 0 && Dhour === 0 && Dminute >= 10 ? (
        <TimeComponent>
          <DuringText>경기 시작 {Dminute}분 전</DuringText>
        </TimeComponent>
      ) : Dday === 0 && Dhour === 0 && Dminute > 0 && Dminute < 10 ? (
        <TimeComponent>
          <DuringText>
            경기 시작 {minutes}분 {seconds}초 전
          </DuringText>
        </TimeComponent>
      ) : (
        Dday === 0 &&
        Dhour === 0 &&
        Dminute === 0 && (
          <TimeComponent>
            <DuringText>경기 시작 {seconds}초 전</DuringText>
          </TimeComponent>
        )
      )}
    </TimeContainer>
  );
}

export default MatchTimeComponent;
