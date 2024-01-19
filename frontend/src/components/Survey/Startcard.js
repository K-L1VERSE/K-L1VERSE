import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅
import {
  Main,
  Img,
  MainTitle,
  MainButton,
} from "../../styles/SurveyStyles/StartCardStyle"; // 스타일 파일 import

import logo from "../../assets/K-L1VERSE.png";

function Startcard() {
  const navigate = useNavigate(); // useNavigate 훅 사용
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
          navigate("/question/1");
        }}
      >
        START!
      </MainButton>
    </Main>
  );
}

export default Startcard;
