import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  CommentItem,
  CommentWriter,
  CommentContent,
  CommentInput,
  ButtonContainer,
  EditButton,
  DeleteButton,
  CommentTime,
  CommentListContainer,
  LikeBox,
  CommentContentContainer,
  WriterContainer,
  WriterProfile,
  WriterBadge,
} from "../../styles/BoardStyles/CommentStyle";
import { likeComment, unlikeComment, updateComment } from "../../api/comment";
import { UserState } from "../../global/UserState";
import Like from "./Like";
import { useParams } from "react-router-dom";

function CommentItemCard({ comment, onCommentDelete, formatRelativeTime }) {
  console.log("comment: ", comment);
  const [liked, setLiked] = useState(comment.liked);
  const [likesCount, setLikesCount] = useState(comment.likesCount);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const { userId } = useRecoilState(UserState)[0];
  const { commentId } = useParams;

  const handleUpdateBtn = () => {
    if (isEditMode) {
      if (updatedContent === comment.content || updatedContent === "") {
        return;
      }

      updateComment(
        comment.commentId,
        {
          content: updatedContent,
          isSecret: comment.isSecret,
        },
        () => {
          setIsEditMode(false);
          comment.content = updatedContent;
        },
        () => {},
      );
    } else {
      setIsEditMode(true);
    }
  };

  const renderEditDeleteButtons = () => {
    if (userId === comment.userId) {
      return (
        <ButtonContainer>
          <EditButton
            type="button"
            onClick={() => {
              handleUpdateBtn(comment.commentId, comment.content);
            }}
          >
            {isEditMode ? "완료" : "수정"}
          </EditButton>
          <DeleteButton
            type="button"
            onClick={() => onCommentDelete(comment.commentId)}
          >
            삭제
          </DeleteButton>
        </ButtonContainer>
      );
    }
    return null;
  };

  const handleLikeClick = () => {
    if (liked) {
      unlikeComment(
        comment.commentId,
        { userId },
        () => {
          setLiked(false);
          setLikesCount((prevCount) => prevCount - 1);
        },
        () => {},
      );
    } else {
      likeComment(
        comment.commentId,
        { userId },
        () => {
          setLiked(true);
          setLikesCount((prevCount) => prevCount + 1);
        },
        () => {},
      );
    }
  };

  return (
    <CommentListContainer>
      <WriterContainer>
        {comment.profile && <WriterProfile src={comment.profile} />}
        <CommentWriter>{comment.nickname}</CommentWriter>
        {comment.mainBadge && (
          <WriterBadge
            src={`${process.env.PUBLIC_URL}/badge/badge${comment.mainBadge === null ? 0 : comment.mainBadge}.png`}
          />
        )}
      </WriterContainer>
      <CommentItem key={comment.commentId}>
        {isEditMode ? (
          // 수정 모드일 때는 입력 필드를 보여줌
          <>
            <CommentContentContainer>
              <CommentInput
                type="text"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            </CommentContentContainer>
            <CommentContentContainer>
              <CommentTime>{formatRelativeTime(comment.createAt)}</CommentTime>
              {renderEditDeleteButtons()}
            </CommentContentContainer>
          </>
        ) : (
          // 수정 모드가 아닐 때는 댓글 내용을 보여줌
          <>
            <CommentContentContainer>
              <CommentContent>{comment.content}</CommentContent>
              <LikeBox>
                <Like
                  liked={liked}
                  likesCount={likesCount}
                  handleLikeClick={handleLikeClick}
                />
              </LikeBox>
            </CommentContentContainer>
            <CommentContentContainer>
              <CommentTime>{formatRelativeTime(comment.createAt)}</CommentTime>
              {renderEditDeleteButtons()}
            </CommentContentContainer>
          </>
        )}
      </CommentItem>
    </CommentListContainer>
  );
}

export default CommentItemCard;
