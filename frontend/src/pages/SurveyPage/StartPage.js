/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSurvey } from "../../api/survey";
import {
  Main,
  Img,
  MainTitle,
  MainButton,
} from "../../styles/SurveyStyles/StartCardStyle";
import logo from "../../assets/K-L1VERSE.png";

function StartPage() {
  const nav = useNavigate();
  const [surveyId, setSurvey] = useState("survey");

  useEffect(() => {
    // 설문 가져오기
    getSurvey(surveyId).then((data) => {
      setSurvey(data.surveyId);
    });
  }, []);

  return (
    <Main>
      <Img src={logo} />
      <div className={MainTitle}>
        <h1>재미로 보는</h1>
        <h1>
          나와 비슷한{" "}
          <span style={{ color: "#ED5AB3", fontSize: "1.3em" }}>케이리그</span>{" "}
          구단은?
        </h1>
      </div>
      <MainButton
        style={{ background: "#001B79" }}
        onClick={() => {
          nav("/question/1");
        }}
      >
        START!
      </MainButton>
    </Main>
  );
}

export default StartPage;
