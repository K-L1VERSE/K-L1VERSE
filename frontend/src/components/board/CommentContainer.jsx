import React from "react";
import { CommentListContainer } from "../../styles/BoardStyles/CommentStyle";
import CommentItemCard from "./CommentItemCard";

function CommentContainer({
  boardId,
  commentList,
  likecount,
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
          likecount={likecount}
          formatRelativeTime={formatRelativeTime}
          onCommentDelete={onCommentDelete}
        />
      ))}
    </CommentListContainer>
  );
}

export default CommentContainer;
