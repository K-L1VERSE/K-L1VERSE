import React from "react";
import CommentForm from "./CommentForm";
import {
  CommentItem,
  CommentContent,
  ButtonContainer,
  EditButton,
  DeleteButton,
} from "../../styles/BoardStyles/CommentStyle";

function CommentItemCard({
  comment,
  editingCommentId,
  handleUpdateBtn,
  handleDeleteBtn,
}) {
  return (
    <CommentItem key={comment.commentId}>
      {editingCommentId === comment.commentId ? (
        <CommentForm
          boardId={comment.boardId}
          onCommentSubmit={(updatedContent) =>
            handleUpdateBtn(comment.commentId, updatedContent)
          }
          onCancel={() => handleUpdateBtn(null, "")} // Add onCancel prop
          defaultContent={comment.content}
        />
      ) : (
        <>
          <CommentContent>{comment.content}</CommentContent>
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
        </>
      )}
    </CommentItem>
  );
}

export default CommentItemCard;
