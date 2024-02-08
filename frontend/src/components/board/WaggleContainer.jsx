import React from "react";
import { ListContainer } from "../../styles/BoardStyles/BoardStyle";

import WaggleItemCard from "./WaggleItemCard";

function WaggleContainer({ waggleList, formatRelativeTime }) {
  return (
    <ListContainer>
      {waggleList.map((waggle) => (
        <WaggleItemCard
          key={waggle.waggleId}
          waggle={waggle}
          formatRelativeTime={formatRelativeTime}
        />
      ))}
    </ListContainer>
  );
}

export default WaggleContainer;
