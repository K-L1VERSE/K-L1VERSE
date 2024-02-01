import React from "react";
import { WaggleListContainer } from "../../styles/BoardStyles/WaggleListStyle";

import WaggleItemCard from "./WaggleItemCard";

function WaggleContainer({ waggleList, formatRelativeTime }) {
  return (
    <WaggleListContainer>
      {waggleList.map((waggle) => (
        <WaggleItemCard
          key={waggle.waggleId}
          waggle={waggle}
          formatRelativeTime={formatRelativeTime}
        />
      ))}
    </WaggleListContainer>
  );
}

export default WaggleContainer;
