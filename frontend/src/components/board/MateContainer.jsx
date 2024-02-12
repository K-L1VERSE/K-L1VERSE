import React from "react";
import MateItemCard from "./MateItemCard";
import { ListContainer, ForPadding } from "../../styles/BoardStyles/BoardStyle";

function MateContainer({ mateList, user, fromMypage, category }) {
  return (
    <ListContainer>
      {mateList.map((mate) => (
        <ForPadding key={mate.mateId}>
          <MateItemCard
            mate={mate}
            user={user}
            fromMypage={fromMypage}
            category={category}
          />
        </ForPadding>
      ))}
    </ListContainer>
  );
}

export default MateContainer;
