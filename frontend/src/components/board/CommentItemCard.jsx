import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import {
  CommentItem,
  CommentWriter,
  CommentContent,
  CommentInput,
  ButtonContainer,
  EditButton,
  DeleteButton,
  CommentTime,
  CommentListContainer,
  LikeBox,
  CommentContentContainer,
  WriterContainer,
  WriterProfile,
  WriterBadge,
  ReplyButton,
  ReplyImg,
  ReplyMode,
} from "../../styles/BoardStyles/CommentStyle";
import ReplyIcon from "../../assets/icon/reply-icon.svg";
import { likeComment, unlikeComment, updateComment } from "../../api/comment";
import { UserState } from "../../global/UserState";
import Like from "./Like";
import { ReactComponent as LikeCount } from "../../assets/icon/likecount-icon.svg";
import CocomentIcon from "../../assets/icon/cocoment-icon.png";
import CommentForm from "./CommentForm";

function CommentItemCard({
  type,
  comment,
  onCommentDelete,
  formatRelativeTime,
  setIsReplyMode,
  setParentId,
  writerId,
}) {
  const [liked, setLiked] = useState(comment.liked);
  const [likesCount, setLikesCount] = useState(comment.likesCount);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const { userId } = useRecoilState(UserState)[0];

  const handleUpdateBtn = () => {
    if (isEditMode) {
      if (updatedContent === "") {
        return;
      }

      updateComment(
        comment.commentId,
        {
          content: updatedContent,
          isSecret: comment.isSecret,
        },
        () => {
          setIsEditMode(false);
          comment.content = updatedContent;
        },
        () => {},
      );
    } else {
      setIsEditMode(true);
    }
  };

  const renderEditDeleteButtons = () => {
    if (userId === comment.userId) {
      return (
        <ButtonContainer>
          <EditButton
            type="button"
            onClick={() => {
              handleUpdateBtn(comment.commentId, comment.content);
            }}
          >
            {isEditMode ? "완료" : "수정"}
          </EditButton>
          <DeleteButton
            type="button"
            onClick={() => onCommentDelete(comment.commentId)}
          >
            삭제
          </DeleteButton>
          {type === "comment" && (
            <ReplyButton
              type="button"
              onClick={() => {
                setIsReplyMode(true);
                setParentId(comment.commentId);
              }}
            >
              <img src={CocomentIcon} alt="comment" width="20" height="20" />
            </ReplyButton>
          )}
        </ButtonContainer>
      );
    }
    return (
      <div>
        {type === "comment" && (
          <ButtonContainer>
            <ReplyButton
              onClick={() => {
                setIsReplyMode(true);
                setParentId(comment.commentId);
              }}
            >
              <img src={CocomentIcon} alt="comment" width="20" height="20" />
            </ReplyButton>
          </ButtonContainer>
        )}
      </div>
    );
  };

  const handleLikeClick = () => {
    if (liked) {
      unlikeComment(
        comment.commentId,
        { userId },
        () => {
          setLiked(false);
          setLikesCount((prevCount) => prevCount - 1);
        },
        () => {},
      );
    } else {
      likeComment(
        comment.commentId,
        { userId },
        () => {
          setLiked(true);
          setLikesCount((prevCount) => prevCount + 1);
        },
        () => {},
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>{type === "reply" && <ReplyImg src={ReplyIcon} alt="reply" />}</div>
      <div
        style={{
          width: "100%",
        }}
      >
        <CommentListContainer $type={type}>
          {(!comment.isSecret ||
            (comment.isSecret &&
              (userId === comment.userId ||
                userId === writerId ||
                userId === comment.parentCommentUserId))) && (
            <div>
              <WriterContainer>
                {comment.profile && <WriterProfile src={comment.profile} />}
                <CommentWriter>{comment.nickname}</CommentWriter>
                <WriterBadge
                  src={`${process.env.PUBLIC_URL}/badge/badge${comment.mainBadge === null ? 0 : comment.mainBadge}back.png`}
                />
                {comment.isSecret &&
                  (userId === comment.userId ||
                    userId === writerId ||
                    userId === comment.parentCommentUserId) && (
                    <div>
                      <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked.png"
                        alt="Locked"
                        width="20"
                        height="20"
                      />
                    </div>
                  )}
              </WriterContainer>
            </div>
          )}

          <CommentItem key={comment.commentId}>
            {isEditMode ? (
              <>
                <CommentContentContainer>
                  <CommentInput
                    type="text"
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                </CommentContentContainer>
                <CommentContentContainer>
                  <CommentTime>
                    {formatRelativeTime(comment.createAt)}
                  </CommentTime>
                  {renderEditDeleteButtons()}
                </CommentContentContainer>
              </>
            ) : (
              <>
                <CommentContentContainer>
                  <CommentContent>{comment.content}</CommentContent>
                  <div>
                    {(!comment.isSecret ||
                      (comment.isSecret &&
                        (userId === comment.userId ||
                          userId === writerId ||
                          userId === comment.parentCommentUserId))) && (
                      <div>
                        <LikeBox>
                          <Like
                            liked={liked}
                            handleLikeClick={handleLikeClick}
                          />
                        </LikeBox>
                      </div>
                    )}
                  </div>
                </CommentContentContainer>
                <CommentContentContainer>
                  <CommentTime>
                    <div
                      style={{
                        marginTop: "0.05rem",
                      }}
                    >
                      {formatRelativeTime(comment.createAt)}
                    </div>
                    <div
                      style={{
                        marginRight: "0.3rem",
                      }}
                    >
                      <Like likesCount={likesCount} />
                    </div>
                    <div>
                      <LikeCount
                        width="0.8rem"
                        height="0.8rem"
                        style={{
                          marginBottom: "0.1rem",
                        }}
                      />
                    </div>
                  </CommentTime>
                  {renderEditDeleteButtons()}
                </CommentContentContainer>
              </>
            )}
          </CommentItem>
        </CommentListContainer>
      </div>
    </div>
  );
}

export default CommentItemCard;
