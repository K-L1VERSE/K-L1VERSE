import React from "react";
import { ListContainer, ForPadding } from "../../styles/BoardStyles/BoardStyle";
import WaggleItemCard from "./WaggleItemCard";

function WaggleContainer({ waggleList, formatRelativeTime }) {
  return (
    <ListContainer>
      {waggleList.map((waggle) => (
        <ForPadding key={waggle.waggleId}>
          <WaggleItemCard
            waggle={waggle}
            formatRelativeTime={formatRelativeTime}
          />
        </ForPadding>
      ))}
    </ListContainer>
  );
}

export default WaggleContainer;
