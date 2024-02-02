import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import CommentForm from "./CommentForm";
import {
  ListContainer,
  CommentItem,
  CommentContent,
  ButtonContainer,
  EditButton,
  DeleteButton,
} from "../../styles/BoardStyles/CommentStyle";

function CommentList({ boardId }) {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/board/comments/list/${boardId}`);
        setComments(response.data);
      } catch (error) {
        console.error("댓글을 불러오는 중 에러 발생:", error);
      }
    };

    fetchComments();
  }, [boardId]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.get(`/board/comments/list/${boardId}`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글을 다시 불러오는 중 에러 발생:", error);
    }
  };

  const handleCommentUpdate = async (commentId, updatedContent) => {
    try {
      // 서버에 댓글 업데이트 요청 보내기
      await axios.put(`/board/comments/${commentId}`, {
        content: updatedContent,
      });

      // 댓글 업데이트 후 새로운 댓글 목록을 가져와서 설정
      const response = await axios.get(`/board/comments/list/${boardId}`);
      setComments(response.data);

      // 수정 상태 종료
      setEditingCommentId(null);
      setEditingCommentContent("");
    } catch (error) {
      console.error("댓글 업데이트 중 에러 발생:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      // 댓글 삭제 요청 보내기
      await axios.delete(`/board/comments/${commentId}`);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentId),
      );
    } catch (error) {
      console.error("댓글 삭제 중 에러 발생:", error);
    }
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
                      setEditingCommentId(comment.commentId);
                      setEditingCommentContent(comment.content);
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
