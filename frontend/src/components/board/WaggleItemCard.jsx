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
      {waggle.board.boardImage && waggle.board.boardImage.length > 0 && (
        // 첫 번째 이미지만 출력
        <WaggleImage src={waggle.board.boardImage[0]} alt="Waggle Image" />
      )}
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
      <ItemContent>
        <ItemTitle>
          <Link
            to={`/waggle/${waggle.board.boardId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {waggle.board.title}
          </Link>
        </ItemTitle>
        <Link
          to={`/waggle/${waggle.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{waggle.board.content}</p>
        </Link>
      </ItemContent>
    </ItemContainer>
  );
}

export default WaggleItemCard;
