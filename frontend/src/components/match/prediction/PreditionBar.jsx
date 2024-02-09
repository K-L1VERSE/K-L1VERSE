import React from "react";

import {
  TotalBarContainer,
  BarContainer,
} from "../../../styles/match-styles/prediction/PreditionBarStyles";

function PredictionBar({ ratio }) {
  return (
    <TotalBarContainer>
      <BarContainer ratio={ratio} />
    </TotalBarContainer>
  );
}

export default PredictionBar;
