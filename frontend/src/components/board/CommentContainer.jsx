import React from "react";
import { CommentListContainer } from "../../styles/BoardStyles/CommentStyle";
import CommentItemCard from "./CommentItemCard";

function CommentContainer({
  boardId,
  commentList,
  formatRelativeTime,
  onCommentDelete,
}) {
  return (
    <CommentListContainer>
      {commentList.map((comment) => (
        <CommentItemCard
          key={comment.commentId}
          boardId={boardId}
          comment={comment}
          formatRelativeTime={formatRelativeTime}
          onCommentDelete={onCommentDelete}
        />
      ))}
    </CommentListContainer>
  );
}

export default CommentContainer;
