import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { UserState } from "../../global/UserState";
import CommentContainer from "./CommentContainer";
import { ListContainer } from "../../styles/BoardStyles/CommentStyle";
import {
  createComment,
  deleteComment,
  getCommentList,
} from "../../api/comment";
import { formatRelativeTime } from "./dateFormat";
import CommentForm from "./CommentForm";

const CommentList = ({ boardId, writerId }) => {
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [userState] = useRecoilState(UserState);
  const { userId } = userState;
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [parentId, setParentId] = useState(null);

  const getComments = () => {
    getCommentList(
      boardId,
      { userId },
      ({ data }) => {
        setCommentList(data);
        setCommentId(data.commentId);
        setLiked(data.liked);
      },
      () => {},
    );
  };

  useEffect(() => {
    getComments();
  }, []);

  // console.log(commentList);
  // console.log("commentId$$$$$$$$$", commentId);
  // console.log("liked?!?!??", liked);

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
    Swal.fire({
      html: `
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Bear.png" alt="Bear" width="100" height="100"/>
        <p style='font-size:1.2rem; font-family:Pretendard-Bold;'>댓글을 삭제하시겠습니까?</p>
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        "<div style='font-size:1rem; font-family:Pretendard-Regular;'>삭제</div>",
      cancelButtonText:
        "<div style='font-size:1rem; font-family:Pretendard-Regular;'>취소</div>",
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    });
  };

  return (
    <ListContainer>
      <CommentContainer
        boardId={boardId}
        commentList={commentList}
        formatRelativeTime={formatRelativeTime}
        onCommentDelete={handleCommentDelete}
        setIsReplyMode={setIsReplyMode}
        setParentId={setParentId}
        writerId={writerId}
      />
      <CommentForm
        boardId={boardId}
        parentId={parentId}
        onCommentSubmit={handleCommentSubmit}
        getComments={getComments}
        isReplyMode={isReplyMode}
        setIsReplyMode={setIsReplyMode}
        setParentId={setParentId}
      />
    </ListContainer>
  );
};

export default CommentList;
