import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import CommentForm from "./CommentForm";

function CommentList({ boardId, parentId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/list/${boardId}`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글을 불러오는 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 최상위 댓글을 가져옵니다.
    if (!parentId) {
      fetchComments();
    }
  }, [boardId, parentId]);

  const handleCommentSubmit = (newComment) => {
    // 새로운 댓글을 기존 댓글에 추가합니다.
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div>
      <h2>댓글 목록</h2>
      <ul>
        {comments
          .filter((comment) => comment.parentId === parentId)
          .map((comment) => (
            <li key={comment.commentId}>
              <p>{comment.content}</p>
              {/* 대댓글 폼을 표시하고 대댓글 목록을 불러오기 위해 CommentForm과 CommentList를 중첩 호출합니다. */}
              <CommentForm
                boardId={boardId}
                parentId={comment.commentId}
                onCommentSubmit={handleCommentSubmit}
              />
              <CommentList boardId={boardId} parentId={comment.commentId} />
            </li>
          ))}
      </ul>

      {/* 최상위 댓글인 경우에만 CommentForm을 렌더링합니다. */}
      {!parentId && (
        <CommentForm
          boardId={boardId}
          parentId={null}
          onCommentSubmit={handleCommentSubmit}
        />
      )}
    </div>
  );
}

export default CommentList;
