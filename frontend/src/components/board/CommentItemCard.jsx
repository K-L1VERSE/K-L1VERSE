import React from "react";
import {
  CommentItem,
  CommentContent,
  ButtonContainer,
  EditButton,
  DeleteButton,
} from "../../styles/BoardStyles/CommentStyle";

function CommentItemCard({
  comment,
  handleUpdateBtn,
  handleDeleteBtn,
  handleLikeClick,
}) {
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
