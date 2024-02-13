import React from "react";
import { CommentListContainer } from "../../styles/BoardStyles/CommentStyle";
import CommentItemCard from "./CommentItemCard";

function CommentContainer({
  boardId,
  commentList,
  formatRelativeTime,
  onCommentDelete,
  handleReplyMode,
  setIsReplyMode,
  setParentId,
}) {
  return (
    <CommentListContainer>
      {commentList.map((comment) => (
        <React.Fragment key={comment.commentId}>
          <CommentItemCard
            key={comment.commentId}
            type="comment"
            boardId={boardId}
            comment={comment}
            formatRelativeTime={formatRelativeTime}
            onCommentDelete={onCommentDelete}
            handleReplyMode={handleReplyMode}
            setIsReplyMode={setIsReplyMode}
            setParentId={setParentId}
          />
          {comment.replies && comment.replies.length > 0 && (
            <div>
              {comment.replies.map((reply) => (
                <CommentItemCard
                  key={reply.commentId}
                  type="reply"
                  boardId={boardId}
                  comment={reply}
                  formatRelativeTime={formatRelativeTime}
                  onCommentDelete={onCommentDelete}
                  handleReplyMode={handleReplyMode}
                />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </CommentListContainer>
  );
}

export default CommentContainer;
