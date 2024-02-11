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
  WriterContainer,
  WriterProfile,
  WriteBadge,
} from "../../styles/BoardStyles/BoardStyle";
import { WaggleListImage } from "../../styles/BoardStyles/WaggleListStyle";

function WaggleItemCard({
  waggle,
  formatRelativeTime,
  user,
  fromMypage,
  category,
}) {
  const boardImage = waggle.board.boardImage
    ? waggle.board.boardImage.split(",").map((image) => image.trim())
    : [];

  return (
    <Link
      to={`/waggle/${waggle.board.boardId}`}
      style={{ textDecoration: "none", color: "black" }}
      state={{ user, fromMypage, category }}
    >
      <ItemContainer>
        <WriterContainer>
          <WriterProfile src={waggle.board.profile} alt="Profile Image" />
          <ItemWriter>{waggle.board.nickname}</ItemWriter>
          <WriteBadge
            src={`${process.env.PUBLIC_URL}/badge/badge${waggle.board.mainBadge === null ? 0 : waggle.board.mainBadge}.png`}
          />
        </WriterContainer>
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
