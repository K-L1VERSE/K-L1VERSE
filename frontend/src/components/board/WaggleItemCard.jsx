import React from "react";
import { Link } from "react-router-dom";
import {
  WaggleItemWriter,
  WaggleItemTitle,
  WaggleItemContent,
  WaggleItemInfoSection,
  WaggleItemInfoItem,
} from "../../styles/BoardStyles/WaggleListStyle";
import { ReactComponent as LikeCount } from "../../assets/icon/likecount-icon.svg";
import { ReactComponent as Comment } from "../../assets/icon/comment-icon.svg";
import { ItemContainer } from "../../styles/BoardStyles/BoardStyle";

function WaggleItemCard({ waggle, formatRelativeTime }) {
  return (
    <ItemContainer>
      <WaggleItemWriter>{waggle.nickname}</WaggleItemWriter>
      <WaggleItemTitle>
        <Link
          to={`/waggle/${waggle.board.boardId}`}
          style={{ textDecoration: "none", color: "black" }}
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
          <LikeCount />
          좋아요 {waggle.likesCount}
        </WaggleItemInfoItem>
        <WaggleItemInfoItem className="waggle-comment">
          <Comment />
          댓글 {waggle.board.commentCount}
        </WaggleItemInfoItem>
        <WaggleItemInfoItem>
          {formatRelativeTime(waggle.board.createAt)}
        </WaggleItemInfoItem>
      </WaggleItemInfoSection>
    </ItemContainer>
  );
}

export default WaggleItemCard;
