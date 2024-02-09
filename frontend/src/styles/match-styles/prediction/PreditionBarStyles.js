import styled, { keyframes } from "styled-components";

export const fillAnimation = (ratio) => keyframes`
  from {
    width: 0;
  }
  to {
    width:  ${ratio}%;
  }
`;

export const TotalBarContainer = styled.div`
  width: 100px;
  height: 20px;
  background-color: #e5edfb;
  border-radius: 4px;
`;

export const BarContainer = styled.div`
  width: 0%;
  height: 20px;
  background-color: #3261c1;
  border-radius: 4px;
  animation: ${({ ratio }) => fillAnimation(ratio)} 1.5s ease-out forwards;
`;
