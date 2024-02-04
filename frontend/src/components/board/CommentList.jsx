import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "../../api/axios";

import CommentForm from "./CommentForm";
import CommentContainer from "./CommentContainer"; // Import CommentContainer
import { ListContainer } from "../../styles/BoardStyles/CommentStyle";
import {
  getCommentList,
  createComment,
  updateComment,
  deleteComment,
} from "../../api/comment";
import { formatRelativeTime } from "./dateFormat";
import { UserState } from "../../global/UserState";

function CommentList({ boardId }) {
  const [content] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentDetail, setCommentDetail] = useState({});
  const [commentId, setCommentId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const { userId } = useRecoilState(UserState)[0];

  function getComments() {
    getCommentList(
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

  // const handleLikeClick = () => {
  //   if (isLiked) {
  //     unlikeComment(
  //       { userId },
  //       waggleId,
  //       () => {
  //         setIsLiked(false);
  //         setLikeCount((prevCount) => prevCount - 1);
  //       },
  //       () => {},
  //     );
  //   } else {
  //     likeComment(
  //       { userId },
  //       waggleId,
  //       () => {
  //         setIsLiked(true);
  //         setLikeCount((prevCount) => prevCount + 1);
  //       },
  //       () => {},
  //     );
  //   }
  // };

  return (
    <ListContainer>
      <h2>댓글 목록</h2>
      <CommentContainer
        commentList={commentList}
        formatRelativeTime={formatRelativeTime}
      />
    </ListContainer>
  );
}

export default CommentList;
