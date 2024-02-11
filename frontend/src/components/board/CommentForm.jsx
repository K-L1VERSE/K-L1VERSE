import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { UserState } from "../../global/UserState";
import {
  CommentFormContainer,
  TextArea,
  SubmitButton,
  CancelButton,
  CheckboxLabel,
  CheckboxInput,
  TextContainer,
  TextBottom,
  UserInfo,
} from "../../styles/BoardStyles/CommentStyle";
import {
  SenderImg,
  BadgeImg,
} from "../../styles/match-styles/MatchChattingStyle";
import { updateComment, createComment } from "../../api/comment";

const CommentForm = ({ boardId, parentId, getComments }) => {
  const [content, setContent] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const { userId } = useRecoilState(UserState)[0];
  const [userState] = useRecoilState(UserState);
  const { nickname } = userState;
  const { profile } = userState;
  const { mainBadge } = userState;

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.board) {
      setContent(location.state.comment.content);
      setIsSecret(location.state.comment.isSecret || false);
    }
  }, [location]);

  const handleSubmit = () => {
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
          getComments();
          setContent("");
          setIsSecret(false);
        },
        () => {},
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <CommentFormContainer>
      <UserInfo>
        <SenderImg src={profile} />
        <div>{nickname}</div>
        <BadgeImg
          src={`${process.env.PUBLIC_URL}/badge/badge${mainBadge}.png`}
        />
      </UserInfo>
      <TextContainer>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          required
          placeholder="댓글을 작성하세요."
        />
      </TextContainer>
      <TextBottom>
        <CheckboxLabel>
          <CheckboxInput
            type="checkbox"
            checked={isSecret}
            onChange={() => setIsSecret(!isSecret)}
          />
          <div>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked.png"
              alt="Locked"
              width="20"
              height="20"
            />
            <div> 비밀</div>
          </div>
        </CheckboxLabel>
        <div>
          <SubmitButton type="button" onClick={handleSubmit}>
            {isUpdateMode ? "댓글 수정 완료" : "등록"}
          </SubmitButton>
          {isUpdateMode && (
            <CancelButton type="button" onClick={() => setIsUpdateMode(false)}>
              수정 취소
            </CancelButton>
          )}
        </div>
      </TextBottom>
    </CommentFormContainer>
  );
};

export default CommentForm;
