// WaggleItemCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  WaggleItemContainer,
  WaggleItemTitle,
  WaggleItemContent,
  WaggleItemInfoSection,
  WaggleItemInfoItem,
  WaggleItemSeparator,
} from "../../styles/BoardStyles/WaggleListStyle";

function WaggleItemCard({ waggle, formatRelativeTime }) {
  return (
    <WaggleItemContainer>
      <WaggleItemTitle>
        <Link
          to={`/waggle/${waggle.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          {waggle.board.title}
        </Link>
      </WaggleItemTitle>
      <WaggleItemContent>
        <Link
          to={`/waggle/${waggle.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{waggle.board.content}</p>
        </Link>
      </WaggleItemContent>
      <WaggleItemInfoSection>
        <WaggleItemInfoItem className="waggle-like">
          좋아요 {waggle.likesCount} |
        </WaggleItemInfoItem>
        <WaggleItemInfoItem className="waggle-comment">
          댓글 {waggle.board.commentCount} |
        </WaggleItemInfoItem>
        <WaggleItemInfoItem>
          {formatRelativeTime(waggle.board.createAt)}
        </WaggleItemInfoItem>
      </WaggleItemInfoSection>
      <WaggleItemSeparator />
    </WaggleItemContainer>
  );
}

export default WaggleItemCard;
