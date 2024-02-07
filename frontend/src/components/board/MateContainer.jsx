import React from "react";
import MateItemCard from "./MateItemCard";
import { formatRelativeTime } from "./dateFormat";
import { ListContainer } from "../../styles/BoardStyles/BoardStyle";

function MateContainer({ mateList }) {
  return (
    <ListContainer>
      {mateList.map((mate) => (
        <MateItemCard
          key={mate.mateId}
          mate={mate}
          formatRelativeTime={formatRelativeTime}
        />
      ))}
    </ListContainer>
  );
}

export default MateContainer;
