import React from "react";

import styled from "styled-components";

function PredictionBar({ ratio }) {
  return (
    <TotalBarContainer>
      <BarContainer ratio={ratio} />
    </TotalBarContainer>
  );
}

const TotalBarContainer = styled.div`
  width: 100px;
  height: 20px;
  background-color: #e5edfb;
  border-radius: 4px;
`;

const BarContainer = styled.div`
  width: ${({ ratio }) => ratio}%;
  height: 20px;
  background-color: #3261c1;
  border-radius: 4px;
`;

export default PredictionBar;
