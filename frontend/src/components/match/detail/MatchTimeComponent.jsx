import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TimeContainer,
  TimeComponent,
  DoneComponent,
  DuringComponent,
  DuringText,
} from "../../../styles/match-styles/detail/MatchTimeComponentStyles";

function MatchTimeComponent({ time, status }) {
  const { matchId } = useParams();

  const targetTIme = new Date(time);
  const currentTime = new Date();
  const timeDifferenceInMinues = Math.floor(
    (targetTIme - currentTime) / 1000 / 60,
  );

  const Dday = Math.floor(timeDifferenceInMinues / 60 / 24);
  const Dhour = Math.floor((timeDifferenceInMinues / 60) % 24);
  const Dminute = Math.floor(timeDifferenceInMinues % 60);

  const navigate = useNavigate();
  const enterMatch = (to) => {
    if (status !== "done") {
      navigate(`/chat/${to}`);
    }
  };
  return (
    <TimeContainer onClick={() => enterMatch(matchId)}>
      {status === "done" ? (
        <DoneComponent>경기 종료</DoneComponent>
      ) : status === "during" ? (
        <DuringComponent>
          <DuringText>경기 입장하기</DuringText>
        </DuringComponent>
      ) : Dday > 0 ? (
        <TimeComponent>
          경기 시작 {Dday}일 {Dhour}시간 {Dminute}분 전
        </TimeComponent>
      ) : Dday === 0 && Dhour > 0 ? (
        <TimeComponent>
          경기 시작 {Dhour}시간 {Dminute}분 전
        </TimeComponent>
      ) : Dday === 0 && Dhour === 0 && Dminute > 0 ? (
        <TimeComponent>경기 시작 {Dminute}분 전</TimeComponent>
      ) : (
        <TimeComponent>경기 시작 준비 중</TimeComponent>
      )}
    </TimeContainer>
  );
}

export default MatchTimeComponent;
