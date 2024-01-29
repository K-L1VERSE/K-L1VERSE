import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SurveyContainer,
  SurveyButton,
  Img1,
  Img2,
} from "../../styles/main-styles/surveyStyle";
import text1 from "../../assets/text1.png";
import badges from "../../assets/badges.png";

export default function Survey() {
  const navigate = useNavigate();
  const goSurvey = () => {
    navigate("/survey");
  };
  return (
    <div>
      <SurveyContainer onClick={goSurvey}>
        <SurveyButton>
          <Img1 src={text1} />
          <Img2 src={badges} />
        </SurveyButton>
      </SurveyContainer>
    </div>
  );
}
