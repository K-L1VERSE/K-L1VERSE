import React from "react";
import { MateListContainer } from "../../styles/BoardStyles/MateListStyle";
import MateItemCard from "./MateItemCard";

function MateContainer({ mateList }) {
  return (
    <MateListContainer>
      {mateList.map((mate) => (
        <MateItemCard key={mate.mateId} mate={mate} />
      ))}
    </MateListContainer>
  );
}

export default MateContainer;
