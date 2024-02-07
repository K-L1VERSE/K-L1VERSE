import React from "react";
import MateItemCard from "./MateItemCard";
import { ListContainer } from "../../styles/BoardStyles/BoardStyle";

function MateContainer({ mateList }) {
  return (
    <ListContainer>
      {mateList.map((mate) => (
        <MateItemCard key={mate.mateId} mate={mate} />
      ))}
    </ListContainer>
  );
}

export default MateContainer;
