import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { UserState } from "../../global/UserState";
import {
  Form,
  TextArea,
  SubmitButton,
  CancelButton,
  CheckboxLabel,
  CheckboxInput,
} from "../../styles/BoardStyles/CommentStyle";
import { updateComment, createComment } from "../../api/comment";

function CommentForm({ boardId, parentId }) {
  const [content, setContent] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const { userId } = useRecoilState(UserState)[0];

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.board) {
      setContent(location.state.comment.content);
      setIsSecret(location.state.comment.isSecret || false);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      updateComment(
        boardId,
        {
          board: {
            content,
            boardId,
            parentId: parentId || null,
            isSecret,
          },
        },
        () => {
          setIsUpdateMode(false);
        },
        () => {},
      );
    } else {
      createComment(
        boardId,
        {
          content,
          boardId,
          parentId: parentId || null,
          userId,
          isSecret,
        },
        () => {
          setContent("");
          setIsSecret(false);
        },
        () => {},
      );
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
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          checked={isSecret}
          onChange={() => setIsSecret(!isSecret)}
        />
        <span>🔒비밀</span>
      </CheckboxLabel>
      <SubmitButton>
        {isUpdateMode ? "댓글 수정 완료" : "댓글 작성"}
      </SubmitButton>
      {isUpdateMode && (
        <CancelButton type="button" onClick={() => setIsUpdateMode(false)}>
          수정 취소
        </CancelButton>
      )}
    </Form>
  );
}

export default CommentForm;
