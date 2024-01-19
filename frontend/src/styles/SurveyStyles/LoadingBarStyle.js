// LoadingBarStyles.js
import styled from "styled-components";

export const Progress = styled.div`
  position: relative;
  background-color: #ff90c2;
  text-align: center;
  font-family: "WarhavenB";
  border-radius: 20px;
  height: 100%;
  width: 80%;
  margin: 0 auto;
`;

export const Done = styled.div`
  background: linear-gradient(to left, white, #b5c3ff);
  box-shadow:
    0 3px 3px -5px #8bc4c1,
    0 2px 5px #b5c3ff;
  border-radius: 20px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 0;
  opacity: 0;
  transition: 3s ease;
  margin-top: 10%;
`;

export const Text = styled.span`
  font-size: 1.5em;
  color: #b5c3ff;
`;
