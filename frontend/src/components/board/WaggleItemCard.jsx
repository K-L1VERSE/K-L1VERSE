import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LikeCount } from "../../assets/icon/likecount-icon.svg";
import { ReactComponent as Comment } from "../../assets/icon/comment-icon.svg";
import {
  ImageContentBox,
  ItemContainer,
  ItemContent,
  ItemInfoItem,
  ItemInfoSection,
  ItemTitle,
  ItemWriter,
} from "../../styles/BoardStyles/BoardStyle";
import { WaggleListImage } from "../../styles/BoardStyles/WaggleListStyle";

function WaggleItemCard({ waggle, formatRelativeTime }) {
  const boardImage = waggle.board.boardImage
    ? waggle.board.boardImage.split(",").map((image) => image.trim())
    : [];

  return (
    <Link
      to={`/waggle/${waggle.board.boardId}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <ItemContainer>
        <ItemWriter>{waggle.board.nickname}</ItemWriter>
        <ImageContentBox>
          {boardImage.length > 0 && (
            // 첫 번째 이미지만 출력
            <WaggleListImage src={boardImage[0].trim()} alt="Waggle Image" />
          )}
          <ItemContent>
            <ItemTitle>{waggle.board.title}</ItemTitle>
            <p>{waggle.board.content}</p>
          </ItemContent>
        </ImageContentBox>
        <ItemInfoSection>
          <ItemInfoItem className="waggle-like">
            <LikeCount />
            좋아요 {waggle.likesCount}
          </ItemInfoItem>
          <ItemInfoItem className="waggle-comment">
            <Comment />
            댓글 {waggle.board.commentCount}
          </ItemInfoItem>
          <ItemInfoItem>
            {formatRelativeTime(waggle.board.createAt)}
          </ItemInfoItem>
        </ItemInfoSection>
      </ItemContainer>
    </Link>
  );
}

export default WaggleItemCard;
