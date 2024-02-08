import React from "react";

import styled, { keyframes } from "styled-components";

function PredictionBar({ ratio }) {
  return (
    <TotalBarContainer>
      <BarContainer ratio={ratio} />
    </TotalBarContainer>
  );
}

const fillAnimation = (ratio) => keyframes`
  from {
    width: 0;
  }
  to {
    width:  ${ratio}%;
  }
`;

const TotalBarContainer = styled.div`
  width: 100px;
  height: 20px;
  background-color: #e5edfb;
  border-radius: 4px;
`;

const BarContainer = styled.div`
  width: 0%;
  height: 20px;
  background-color: #3261c1;
  border-radius: 4px;
  animation: ${({ ratio }) => fillAnimation(ratio)} 1.5s ease-out forwards;
`;

export default PredictionBar;
