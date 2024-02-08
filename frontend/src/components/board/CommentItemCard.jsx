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
  CommentBig,
} from "../../styles/BoardStyles/CommentStyle";
import { updateComment } from "../../api/comment";
import { UserState } from "../../global/UserState";

function CommentItemCard({
  comment,
  handleLikeClick,
  onCommentDelete,
  formatRelativeTime,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const { userId } = useRecoilState(UserState)[0];

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

  return (
    <CommentBig>
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
        {renderEditDeleteButtons()}
      </CommentItem>
    </CommentBig>
  );
}

export default CommentItemCard;
