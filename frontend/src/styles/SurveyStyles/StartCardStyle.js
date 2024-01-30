import styled from "styled-components";
import { ReactComponent as StartIcon } from "../../assets/icon/start-icon.svg";

export const Main = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
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

export const MainButton = styled.div`
  border: none;
  border-radius: 3px;
  width: 80%;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 10px 10px;
  background-color: #001b79;
  color: white;
  outline: none;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  margin: 30px;
  background: #001b79;
`;

export const StartButton = styled(StartIcon)`
  border-radius: 10px;
  width: 21.125rem;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;
