import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LikeCount } from "../../assets/icon/likecount-icon.svg";
import { ReactComponent as Comment } from "../../assets/icon/comment-icon.svg";
import {
  ItemContainer,
  ItemContent,
  ItemInfoItem,
  ItemInfoSection,
  ItemTitle,
  ItemWriter,
} from "../../styles/BoardStyles/BoardStyle";

function WaggleItemCard({ waggle, formatRelativeTime }) {
  return (
    <ItemContainer>
      <ItemWriter>{waggle.board.nickname}</ItemWriter>
      <ItemTitle>
        <Link
          to={`/waggle/${waggle.board.boardId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {waggle.board.title}
        </Link>
      </ItemTitle>
      <ItemContent>
        <Link
          to={`/waggle/${waggle.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{waggle.board.content}</p>
        </Link>
      </ItemContent>
      <ItemInfoSection>
        <ItemInfoItem className="waggle-like">
          <LikeCount />
          좋아요 {waggle.likesCount}
        </ItemInfoItem>
        <ItemInfoItem className="waggle-comment">
          <Comment />
          댓글 {waggle.board.commentCount}
        </ItemInfoItem>
        <ItemInfoItem>{formatRelativeTime(waggle.board.createAt)}</ItemInfoItem>
      </ItemInfoSection>
    </ItemContainer>
  );
}

export default WaggleItemCard;
