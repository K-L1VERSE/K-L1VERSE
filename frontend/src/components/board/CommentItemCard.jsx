import React, { useState } from "react";
import { useRecoilState } from "recoil";
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
  CommentContainer,
} from "../../styles/BoardStyles/CommentStyle";
import ReplyIcon from "../../assets/icon/reply-icon.svg";
import { likeComment, unlikeComment, updateComment } from "../../api/comment";
import { UserState } from "../../global/UserState";
import Like from "./Like";
import { useParams } from "react-router-dom";
import { ReactComponent as LikeCount } from "../../assets/icon/likecount-icon.svg";

import CommentIcon from "../../assets/comment.png";

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
  const { commentId } = useParams;

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
              onClick={() => {
                setIsReplyMode(true);
                setParentId(comment.commentId);
              }}
            >
              <img src={CommentIcon} alt="comment" width="20" height="20" />
            </ReplyButton>
          )}
        </ButtonContainer>
      );
    }
    return (
      <div>
        {type === "comment" && !comment.isSecret && (
          <ButtonContainer>
            <ReplyButton
              onClick={() => {
                setIsReplyMode(true);
                setParentId(comment.commentId);
              }}
            >
              <img src={CommentIcon} alt="comment" width="20" height="20" />
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
              (userId === comment.userId || userId === writerId))) && (
            <div>
              <WriterContainer>
                {comment.profile && <WriterProfile src={comment.profile} />}
                <CommentWriter>{comment.nickname}</CommentWriter>
                <WriterBadge
                  src={`${process.env.PUBLIC_URL}/badge/badge${comment.mainBadge === null ? 0 : comment.mainBadge}back.png`}
                />
              </WriterContainer>
            </div>
          )}

          <CommentItem key={comment.commentId}>
            {isEditMode ? (
              // 수정 모드일 때는 입력 필드를 보여줌
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
              // 수정 모드가 아닐 때는 댓글 내용을 보여줌
              <>
                <CommentContentContainer>
                  <CommentContent>{comment.content}</CommentContent>
                  <div>
                    {(!comment.isSecret ||
                      (comment.isSecret && userId === comment.userId)) && (
                      <div>
                        <LikeBox>
                          <Like
                            liked={liked}
                            // likesCount={likesCount}
                            handleLikeClick={handleLikeClick}
                          />
                        </LikeBox>
                      </div>
                    )}
                  </div>
                </CommentContentContainer>
                <CommentContentContainer>
                  <CommentTime>
                    <div>{formatRelativeTime(comment.createAt)}</div>
                    <div>
                      <Like likesCount={likesCount} />
                      <LikeCount width="1.2rem" height="1.2rem" />
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
