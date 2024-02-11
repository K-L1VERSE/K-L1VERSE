import React from "react";
import MateItemCard from "./MateItemCard";
import { ListContainer, ForPadding } from "../../styles/BoardStyles/BoardStyle";

function MateContainer({ mateList }) {
  return (
    <ListContainer>
      {mateList.map((mate) => (
        <ForPadding>
          <MateItemCard key={mate.mateId} mate={mate} />
        </ForPadding>
      ))}
    </ListContainer>
  );
}

export default MateContainer;
