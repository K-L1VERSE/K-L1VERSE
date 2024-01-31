// LoadingBarStyles.js
import styled from "styled-components";

export const Progress = styled.div`
  position: relative;
  text-align: center;
  border-radius: 20px;
  width: 80%;
  margin: 0 auto;
  margin-top: 8rem;
  font-weight: bold;
`;

export const Done = styled.div`
  background: linear-gradient(to left, #b5c3ff, #002277); // 002277 b5c3ff
  box-shadow:
    0 3px 3px -5px #8bc4c1,
    0 2px 5px #b5c3ff;
  border-radius: 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  opacity: 0;
  transition: 0.2s ease;
  margin-top: 2rem;
`;

export const Text = styled.span`
  font-size: 1.5em;
  color: #b5c3ff;
`;

export const Kfont = styled.div`
  font-size: 1.7em;
  color: #001b79;
  padding-bottom: 1rem;
`;
