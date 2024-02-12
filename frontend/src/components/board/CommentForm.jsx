import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { UserState } from "../../global/UserState";
import {
  CommentFormContainer,
  TextArea,
  CheckboxLabel,
  CheckboxInput,
  TextContainer,
  TextBottom,
  CommentRegistContainer,
  UserInfoBox,
  CancelButton,
  SubmitContainer,
  SubmitImg,
} from "../../styles/BoardStyles/CommentStyle";
import {
  SenderImg,
  BadgeImg,
} from "../../styles/match-styles/MatchChattingStyle";
import { updateComment, createComment, createReply } from "../../api/comment";
import SendIcon from "../../assets/icon/send-icon.png";

const CommentForm = ({
  boardId,
  parentId,
  getComments,
  isReplyMode,
  setIsReplyMode,
  setParentId,
}) => {
  const [content, setContent] = useState("");
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
    if (content === "") {
      return;
    }

    if (isReplyMode) {
      createReply(
        parentId,
        {
          content,
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
      <CommentRegistContainer>
        <UserInfoBox>
          <SenderImg src={profile} />
          <div style={{ marginLeft: "0.3rem" }}>{nickname}</div>
          <BadgeImg
            src={`${process.env.PUBLIC_URL}/badge/badge${mainBadge}.png`}
          />
        </UserInfoBox>

        {isReplyMode && (
          <CancelButton
            onClick={() => {
              setIsReplyMode(false);
              setParentId(null);
            }}
          >
            대댓글 취소
          </CancelButton>
        )}
      </CommentRegistContainer>
      <TextContainer>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          required
          placeholder={
            isReplyMode ? "대댓글을 작성하세요" : "댓글을 작성하세요."
          }
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
        <SubmitContainer onClick={handleSubmit}>
          {/* <SubmitButton type="button" onClick={handleSubmit}>
            {isUpdateMode ? "댓글 수정 완료" : "등록"}
          </SubmitButton> */}
          <SubmitImg src={SendIcon} />
          {/* {isUpdateMode && (
            <CancelButton type="button" onClick={() => setIsUpdateMode(false)}>
              수정 취소
            </CancelButton>
          )} */}
        </SubmitContainer>
      </TextBottom>
    </CommentFormContainer>
  );
};

export default CommentForm;
