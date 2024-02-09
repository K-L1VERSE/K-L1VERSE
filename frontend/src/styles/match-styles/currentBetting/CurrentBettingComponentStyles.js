import styled, { keyframes } from "styled-components";

export const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  gap: 30px;
`;

export const TeamNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  width: 90px;
  height: 40px;
`;

export const TeamNameComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TeamBettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  width: 100%;
`;

export const TeamName = styled.div`
  font-weight: bold;
  color: #222222;
`;

export const TeamBettingText = styled.div`
  display: flex;
  justify-content: center;

  color: #ffffff;
  font-weight: bold;
  font-size: 0.8rem;
`;

export const fillAnimation = (ratio) => keyframes`
  from {
    width: 100%;
  }
  to {
    width: ${ratio}%;
  }
`;

export const CurrentBettingBar = styled.div`
  width: 100%;
  animation: ${({ ratio }) => fillAnimation(ratio)} 3.5s ease-out forwards;
  height: 30px;
  background-color: #3261c1;

  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
