// CommentList.jsx

import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import CommentForm from "./CommentForm";

const CommentList = ({ boardId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comments/list/${boardId}`);
        setComments(response.data);
      } catch (error) {
        console.error("댓글을 불러오는 중 에러 발생:", error);
      }
    };

    fetchComments();
  }, [boardId]);

  const handleCommentSubmit = (newComment) => {
    // 새로운 댓글을 현재 댓글 목록에 추가
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      <h2>댓글 목록</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.commentId}>
            <p>{comment.content}</p>
            {/* 여기에 추가적인 댓글 정보를 표시할 수 있습니다. */}
          </li>
        ))}
      </ul>
      <CommentForm boardId={boardId} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentList;
