import React from "react";
import { Navigate } from "react-router-dom";
import {
  CommentItem,
  CommentContent,
  ButtonContainer,
  EditButton,
  DeleteButton,
} from "../../styles/BoardStyles/CommentStyle";
import { deleteComment, updateComment } from "../../api/comment";

function CommentItemCard({ boardId, comment, handleLikeClick }) {
  const handleUpdateBtn = () => {
    updateComment(
      comment.commentId,
      {
        content: comment.content,
        isSecret: comment.isSecret,
      },
      () => {},
      () => {},
    );
  };

  const handleDeleteBtn = (commentId) => {
    deleteComment(
      commentId,
      () => {
        Navigate(`/waggle/${boardId}`);
      },
      () => {},
    );
  };

  return (
    <CommentItem key={comment.commentId}>
      <CommentContent>{comment.content}</CommentContent>
      {handleLikeClick && (
        <ButtonContainer>
          <EditButton type="button" onClick={handleLikeClick}>
            좋아요
          </EditButton>
        </ButtonContainer>
      )}
      <ButtonContainer>
        <EditButton
          type="button"
          onClick={() => {
            handleUpdateBtn(comment.commentId, comment.content);
          }}
        >
          수정
        </EditButton>
        <DeleteButton
          type="button"
          onClick={() => handleDeleteBtn(comment.commentId)}
        >
          삭제
        </DeleteButton>
      </ButtonContainer>
    </CommentItem>
  );
}

export default CommentItemCard;
