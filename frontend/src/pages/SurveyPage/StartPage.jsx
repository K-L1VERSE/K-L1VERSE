import React from "react";
import { useNavigate } from "react-router-dom";
import { Main, StartButton } from "../../styles/SurveyStyles/StartCardStyle";
import { SurveyTop, ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";

function StartPage() {
  const nav = useNavigate();

  const goMain = () => {
    nav("/");
  };

  return (
    <Main>
      <SurveyTop>
        <ToLeftImg src={ToLeftPng} onClick={goMain} />
        나와 맞는 구단 알아보기
      </SurveyTop>
      <StartButton
        onClick={() => {
          nav("/question/1");
        }}
      />
    </Main>
  );
}

export default StartPage;
