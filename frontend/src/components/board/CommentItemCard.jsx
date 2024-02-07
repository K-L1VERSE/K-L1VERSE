import React, { useState } from "react";
import {
  CommentItem,
  CommentWriter,
  CommentContent,
  CommentInput,
  ButtonContainer,
  EditButton,
  DeleteButton,
  CommentTime,
} from "../../styles/BoardStyles/CommentStyle";
import { updateComment } from "../../api/comment";

function CommentItemCard({
  comment,
  handleLikeClick,
  onCommentDelete,
  formatRelativeTime,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  const handleUpdateBtn = () => {
    if (isEditMode) {
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

  return (
    <>
      <CommentWriter>{comment.nickname}</CommentWriter>
      <CommentItem key={comment.commentId}>
        {isEditMode ? (
          // 수정 모드일 때는 입력 필드를 보여줌
          <CommentInput
            type="text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        ) : (
          // 수정 모드가 아닐 때는 댓글 내용을 보여줌
          <CommentContent>
            {comment.content}
            <CommentTime>{formatRelativeTime(comment.createAt)}</CommentTime>
          </CommentContent>
        )}
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
            {isEditMode ? "완료" : "수정"}
          </EditButton>
          <DeleteButton
            type="button"
            onClick={() => onCommentDelete(comment.commentId)}
          >
            삭제
          </DeleteButton>
        </ButtonContainer>
      </CommentItem>
    </>
  );
}

export default CommentItemCard;
