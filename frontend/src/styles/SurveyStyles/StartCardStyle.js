import styled from "styled-components";
import Button from "./SurveyButton";

export const Main = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
`;

export const Img = styled.img`
  width: 300px;
  overflow: hidden;
  margin-top: 60px;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 349px) {
    width: 100%;
  }
`;

export const MainTitle = styled.div`
  h1 {
    font-size: 30px;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
    font-family: "WarhavenB";
    color: #001b79;
  }

  span {
    color: #ed5ab3;
    font-size: 1.3em;
  }
`;

export const MainButton = styled(Button)`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
  background: #001b79;
`;
