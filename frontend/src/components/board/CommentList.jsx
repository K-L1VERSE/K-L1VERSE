import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import CommentForm from "./CommentForm";
import CommentContainer from "./CommentContainer"; // Import CommentContainer
import { ListContainer } from "../../styles/BoardStyles/CommentStyle";
import { getCommentList, createComment } from "../../api/comment";
import { formatRelativeTime } from "./dateFormat";
import { UserState } from "../../global/UserState";

function CommentList({ boardId }) {
  const [content] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const { userId } = useRecoilState(UserState)[0];

  useEffect(() => {
    getCommentList(
      boardId,
      (data) => setCommentList(data),
      () => {},
    );
  }, [boardId]);

  const handleCommentSubmit = () => {
    createComment(
      {
        content,
        userId,
      },
      () => {},
      () => {},
    );
  };

  return (
    <ListContainer>
      <h2>댓글 목록</h2>
      <CommentContainer
        commentList={commentList}
        formatRelativeTime={formatRelativeTime}
      />
      {editingCommentId !== null && (
        <CommentForm
          boardId={boardId}
          onCommentSubmit={() => {
            setEditingCommentId(null);
            setEditingCommentContent("");
            handleCommentSubmit();
          }}
          onCancel={() => {
            setEditingCommentId(null);
            setEditingCommentContent("");
          }}
          commentToUpdate={
            editingCommentId
              ? { commentId: editingCommentId, content: editingCommentContent }
              : null
          }
        />
      )}
    </ListContainer>
  );
}

export default CommentList;
