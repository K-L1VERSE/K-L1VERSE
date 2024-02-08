import React, { useState, useEffect } from "react";
import CommentContainer from "./CommentContainer";
import { ListContainer } from "../../styles/BoardStyles/CommentStyle";
import {
  createComment,
  deleteComment,
  getCommentList,
  likeComment,
  unlikeComment,
} from "../../api/comment";
import { formatRelativeTime } from "./dateFormat";
import CommentForm from "./CommentForm";

const CommentList = ({ boardId }) => {
  const [commentList, setCommentList] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [userId] = useState(1);

  const getComments = () => {
    getCommentList(
      boardId,
      { userId },
      ({ data }) => {
        setCommentList(data);
      },
      () => {},
    );
  };

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

  const handleCommentSubmit = (newComment) => {
    createComment(
      boardId,
      {
        content: newComment,
        boardId,
        userId,
      },
      (response) => {
        setCommentList((prevComments) => [...prevComments, response.data]);
      },
      () => {},
    );
  };

  const handleCommentDelete = (commentId) => {
    deleteComment(
      commentId,
      () => {
        setCommentList((prevComments) =>
          prevComments.filter(
            (prevComment) => prevComment.commentId !== commentId,
          ),
        );
      },
      () => {},
    );
  };

  return (
    <ListContainer>
      <h2>댓글 목록</h2>
      <CommentContainer
        boardId={boardId}
        commentList={commentList}
        likeCount={likeCount}
        formatRelativeTime={formatRelativeTime}
        handleLikeClick={handleLikeClick}
        onCommentDelete={handleCommentDelete}
      />
      <CommentForm
        boardId={boardId}
        parentId={commentList.parentId}
        onCommentSubmit={handleCommentSubmit}
        getComments={getComments}
      />
    </ListContainer>
  );
};

export default CommentList;
