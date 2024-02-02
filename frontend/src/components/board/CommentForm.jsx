import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { UserState } from "../../../global/UserState";
import {
  Form,
  TextArea,
  SubmitButton,
  CancelButton,
} from "../../styles/BoardStyles/CommentStyle";
import { updateComment } from "../../api/comment";

function CommentForm({ boardId, parentId, onCommentSubmit }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { userId } = useRecoilState(UserState)[0];

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.board) {
      setTitle(location.state.board.title);
      setContent(location.state.board.content);
    }
  }, [location]);

  const boardId = location.state ? location.state.boardId : null;

  const handleSubmit =  () => {
      if (isUpdateMode) {
        updateComment(
          {
            board: {
              content,
            },
          },
          boardId,
          () => {
            setIsUpdateMode(false);
          },
          () => {},
        );
      } else {
        createComment(
          {
            board: {
              boardType: "COMMENT",
              content,
              userId,
            },
          },
          ({ data }) => {
            navigate(`/waggle/${boardId}`);
          },
          () => {},
        );  
      }

      onCommentSubmit();

      setContent("");
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
