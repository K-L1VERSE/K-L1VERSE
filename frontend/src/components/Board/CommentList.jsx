/* eslint-disable react/button-has-type */
// CommentList.jsx

import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import CommentForm from "./CommentForm";

function CommentList({ boardId }) {
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

  const handleCommentSubmit = async () => {
    try {
      // 댓글 목록 업데이트를 위해 서버에서 최신 댓글 목록을 다시 가져옴
      const response = await axios.get(`/comments/list/${boardId}`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글을 다시 불러오는 중 에러 발생:", error);
    }
  };

  const handleCommentUpdate = (commentId, updatedContent) => {
    const commentIndex = comments.findIndex(
      (comment) => comment.commentId === commentId,
    );

    const updatedComment = { ...comments[commentIndex] };

    updatedComment.content = updatedContent;

    const updatedComments = [...comments];
    updatedComments[commentIndex] = updatedComment;

    setComments(updatedComments);
  };

  const handleCommentDelete = async (commentId) => {
    try {
      // 댓글 삭제 요청 보내기
      await axios.delete(`/comments/${commentId}`);
      console.log("댓글이 삭제되었습니다!");

      // 삭제된 댓글을 제외한 목록으로 업데이트
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentId),
      );
    } catch (error) {
      console.error("댓글 삭제 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <h2>댓글 목록</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.commentId}>
            <p>{comment.content}</p>
            <button
              onClick={() => {
                const updatedContent = prompt(
                  "수정할 내용을 입력하세요",
                  comment.content,
                );
                if (updatedContent !== null) {
                  handleCommentUpdate(comment.commentId, updatedContent);
                }
              }}
            >
              수정
            </button>
            <button onClick={() => handleCommentDelete(comment.commentId)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <CommentForm boardId={boardId} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
}

export default CommentList;
