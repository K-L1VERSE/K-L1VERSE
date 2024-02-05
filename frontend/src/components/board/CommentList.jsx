import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import CommentContainer from "./CommentContainer";
import { ListContainer } from "../../styles/BoardStyles/CommentStyle";
import { getCommentList, likeComment, unlikeComment } from "../../api/comment";
import { formatRelativeTime } from "./dateFormat";
import { UserState } from "../../global/UserState";
import CommentForm from "./CommentForm";

function CommentList({ boardId }) {
  const [comment, setComment] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { userId } = useRecoilState(UserState)[0];

  function getComments() {
    getCommentList(
      boardId,
      userId,
      ({ data }) => {
        setComment(data);
      },
      () => {},
    );
  }

  useEffect(() => {
    getComments();
  }, []);

  const handleLikeClick = () => {
    if (isLiked) {
      unlikeComment(
        boardId,
        () => {
          setIsLiked(false);
          setLikeCount((prevCount) => prevCount - 1);
        },
        () => {},
      );
    } else {
      likeComment(
        boardId,
        () => {
          setIsLiked(true);
          setLikeCount((prevCount) => prevCount + 1);
        },
        () => {},
      );
    }
  };

  return (
    <ListContainer>
      <h2>댓글 목록</h2>
      <CommentContainer
        commentList={comment}
        formatRelativeTime={formatRelativeTime}
        handleLikeClick={handleLikeClick}
      />
      <CommentForm commentId={commentId} />
    </ListContainer>
  );
}

export default CommentList;
