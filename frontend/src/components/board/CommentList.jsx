import React, { useState, useEffect } from "react";
import CommentContainer from "./CommentContainer";
import { ListContainer } from "../../styles/BoardStyles/CommentStyle";
import { getCommentList, likeComment, unlikeComment } from "../../api/comment";
import { formatRelativeTime } from "./dateFormat";
import CommentForm from "./CommentForm";

function CommentList({ boardId }) {
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userId] = useState(1);

  function getComments() {
    getCommentList(
      boardId,
      {
        userId,
      },
      ({ data }) => {
        setCommentList(data);
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
        boardId={boardId}
        commentList={commentList}
        formatRelativeTime={formatRelativeTime}
        handleLikeClick={handleLikeClick}
      />
      <CommentForm boardId={boardId} />
    </ListContainer>
  );
}

export default CommentList;
