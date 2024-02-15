import React from "react";
import {
  CommentItem,
  CommentInput,
  ButtonContainer,
  EditButton,
  ReplyButton,
} from "../../styles/BoardStyles/CommentStyle";
import { createReply } from "../../api/comment";

function CommentReplyCard({ comment }) {
  const handleReplySubmit = async (replyContent) => {
    const response = await createReply(comment.commentId, {
      content: replyContent,
      isSecret,
    });
  };

  return (
    <CommentItem key={comment.commentId}>
      {isEditMode ? (
        <CommentInput
          type="text"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      ) : (
        <ReplyButton />
      )}
      <ButtonContainer>
        <EditButton
          type="button"
          onClick={() => {
            const replyContent = prompt("Enter your reply:");
            if (replyContent) {
              handleReplySubmit(replyContent);
            }
          }}
        >
          대댓글 작성
        </EditButton>
      </ButtonContainer>
    </CommentItem>
  );
}

export default CommentReplyCard;
