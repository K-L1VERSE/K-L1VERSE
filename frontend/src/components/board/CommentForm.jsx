import React, { useState } from "react";
import axios from "../../api/axios";
import {
  Form,
  TextArea,
  SubmitButton,
  CancelButton,
} from "../../styles/BoardStyles/CommentStyle";

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

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        required
        placeholder="댓글을 작성하세요."
      />
      <SubmitButton type="submit">
        {isEditMode ? "댓글 수정 완료" : "댓글 작성"}
      </SubmitButton>
      {isEditMode && (
        <CancelButton type="button" onClick={() => setIsEditMode(false)}>
          수정 취소
        </CancelButton>
      )}
    </Form>
  );
}

export default CommentForm;
