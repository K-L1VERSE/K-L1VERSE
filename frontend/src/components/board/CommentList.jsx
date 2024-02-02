import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import {
  ListContainer,
  CommentItem,
  CommentContent,
  ButtonContainer,
  EditButton,
  DeleteButton,
} from "../../styles/BoardStyles/CommentStyle";
import { createComment, getCommentList } from "../../api/comment";

function CommentList({ boardId }) {
  const [comments, setComments] = useState([]);
  const [CommentId, setCommentId] = useState(null);
  const [content, setContent] = useState("");
  const [updateComment, setUpdateComment] = useState("");

function getComments() {
  getCommentList(
    boardId,
    ({ data }) => {
      setComments(data);
    },
    () => {},
  )

  useEffect(() => {
    getComments();
  }, []);

  const [isBottom, setIsBottom] = useState(false);

  if (hasMore) {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      if (scrollTop + window.innerHeight >= scrollHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  }

  useEffect(() => {
    if (isBottom) {
      getWaggles();
    }
  }, [isBottom]);

  const handleWriteWaggleClick = () => {
    navigate("/commentRegist");
  };

  const handleUpdateBtn = () => {
    updateWaggle(waggleDetail, boardId).then(() => {
      navigate(`/waggle/${boardId}`);
    });
  };

  const handleDeleteBtn = () => {
    deleteWaggle(boardId);
  };
  return (
    <ListContainer>
      <h2>댓글 목록</h2>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.commentId}>
            {editingCommentId === comment.commentId ? (
              <CommentForm
                boardId={boardId}
                onCommentSubmit={(updatedContent) =>
                  handleCommentUpdate(comment.commentId, updatedContent)
                }
                defaultContent={editingCommentContent}
              />
            ) : (
              <>
                <CommentContent>{comment.content}</CommentContent>
                <ButtonContainer>
                  <EditButton
                    type="button"
                    onClick={() => {
                      setUpdateCommentId(comment.commentId);
                      setUpdateCommentContent(comment.content);
                    }}
                  >
                    수정
                  </EditButton>
                  <DeleteButton
                    type="button"
                    onClick={() => handleCommentDelete(comment.commentId)}
                  >
                    삭제
                  </DeleteButton>
                </ButtonContainer>
              </>
            )}
          </CommentItem>
        ))}
      </ul>
      <CommentForm
        boardId={boardId}
        onCommentSubmit={handleCommentSubmit}
        defaultContent={editingCommentContent}
      />
    </ListContainer>
  );
}

export default CommentList;
