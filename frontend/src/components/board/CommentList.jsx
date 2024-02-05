import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import CommentContainer from "./CommentContainer";
import { ListContainer } from "../../styles/BoardStyles/CommentStyle";
import { getCommentList, likeComment, unlikeComment } from "../../api/comment";
import { formatRelativeTime } from "./dateFormat";
import { UserState } from "../../global/UserState";
import CommentForm from "./CommentForm";

function CommentList({ boardId }) {
  const [commentList, setCommentList] = useState([]);
  const [commentDetail, setCommentDetail] = useState({});
  const [commentId, setCommentId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { userId } = useRecoilState(UserState)[0];

  function getComments() {
    getCommentList(
      boardId,
      ({ data }) => {
        setCommentList([...commentList, ...data.content]);
        setCommentDetail(data.board);
        setCommentId(data.commentId);
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
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
        commentList={commentList}
        formatRelativeTime={formatRelativeTime}
        handleLikeClick={handleLikeClick}
      />
      <CommentForm commentId={commentId} />
    </ListContainer>
  );
}

export default CommentList;
