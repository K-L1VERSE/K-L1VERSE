import React from "react";
import { ListContainer, ForPadding } from "../../styles/BoardStyles/BoardStyle";
import WaggleItemCard from "./WaggleItemCard";

function WaggleContainer({
  waggleList,
  formatRelativeTime,
  user,
  fromMypage,
  category,
}) {
  return (
    <ListContainer>
      {waggleList.map((waggle) => (
        <ForPadding>
          <WaggleItemCard
            key={waggle.waggleId}
            waggle={waggle}
            formatRelativeTime={formatRelativeTime}
            user={user}
            fromMypage={fromMypage}
            category={category}
          />
        </ForPadding>
      ))}
    </ListContainer>
  );
}

export default WaggleContainer;
