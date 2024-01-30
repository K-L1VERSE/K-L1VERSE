// CommentForm.jsx

import React, { useState } from "react";
import axios from "../../api/axios";

function CommentForm({ boardId, parentId, onCommentSubmit }) {
  const [content, setContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await axios.put(`/board/comments/${parentId || boardId}`, {
          content,
        });
        setIsEditMode(false);
      } else {
        await axios.post(`/board/comments/${parentId || boardId}`, {
          content,
        });
      }

      onCommentSubmit();

      setContent("");
    } catch (error) {
      // console.error("댓글 작성 또는 수정 중 에러 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        댓글 내용:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <button type="submit">
        {isEditMode ? "댓글 수정 완료" : "댓글 작성"}
      </button>
      {isEditMode && (
        <button type="button" onClick={() => setIsEditMode(false)}>
          수정 취소
        </button>
      )}
    </form>
  );
}

export default CommentForm;
