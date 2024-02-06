import React from "react";
import { CommentListContainer } from "../../styles/BoardStyles/CommentStyle";
import CommentItemCard from "./CommentItemCard";

function CommentContainer({ boardId, commentList, formatRelativeTime }) {
  return (
    <CommentListContainer>
      {commentList.map((comment) => (
        <CommentItemCard
          key={comment.commentId}
          boardId={boardId}
          comment={comment}
          formatRelativeTime={formatRelativeTime}
        />
      ))}
    </CommentListContainer>
  );
}

export default CommentContainer;
