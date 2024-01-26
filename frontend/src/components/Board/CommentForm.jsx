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
        // 수정 모드일 경우, 댓글 업데이트 요청 보내기
        await axios.put(`/comments/${parentId || boardId}`, {
          content,
        });
        console.log("댓글이 수정되었습니다!");
        setIsEditMode(false); // 수정 완료 후 모드 변경
      } else {
        // 수정 모드가 아닐 경우, 댓글 작성 요청 보내기
        const response = await axios.post(`/comments/${parentId || boardId}`, {
          content,
        });
        console.log("댓글이 작성되었습니다!");
        console.log("댓글 내용:", response.data.content);
      }

      // 서버로부터 새로운 댓글 데이터를 받아와 부모 컴포넌트로 전달
      onCommentSubmit();

      // 작성된 댓글 내용 초기화
      setContent("");
    } catch (error) {
      console.error("댓글 작성 또는 수정 중 에러 발생:", error);
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
