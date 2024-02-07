import React from "react";
import { MateListContainer } from "../../styles/BoardStyles/MateListStyle";
import MateItemCard from "./MateItemCard";
import { formatRelativeTime } from "./dateFormat";

function MateContainer({ mateList }) {
  return (
    <MateListContainer>
      {mateList.map((mate) => (
        <MateItemCard
          key={mate.mateId}
          mate={mate}
          formatRelativeTime={formatRelativeTime}
        />
      ))}
    </MateListContainer>
  );
}

export default MateContainer;
