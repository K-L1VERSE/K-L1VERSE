import React from "react";
import { Link } from "react-router-dom";
import {
  MateItemContainer,
  MateItemTitle,
  MateItemContent,
  MateItemInfoSection,
  MateItemCreated,
  MateItemSeparator,
} from "../../styles/BoardStyles/MateListStyle";

function MateItemCard({ mate }) {
  return (
    <MateItemContainer>
      <MateItemTitle>
        <Link
          to={`/mate/${mate.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          {mate.board.title}
        </Link>
      </MateItemTitle>
      <MateItemContent>
        <Link
          to={`/mate/${mate.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{mate.board.content}</p>
        </Link>
      </MateItemContent>
      <MateItemInfoSection>
        <MateItemCreated />
      </MateItemInfoSection>
      <MateItemSeparator />
    </MateItemContainer>
  );
}

export default MateItemCard;
