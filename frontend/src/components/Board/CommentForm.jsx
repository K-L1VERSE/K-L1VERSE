import React, { useState } from "react";
import axios from "../../api/axios";

function CommentForm({ boardId, parentId, onCommentSubmit }) {
  const [commentContent, setCommentContent] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/comments", {
        content: commentContent,
        boardId: boardId,
        parentId: parentId || null,
      });

      // 댓글 입력 필드를 비웁니다.
      setCommentContent("");

      // 부모 컴포넌트에 새 댓글을 알립니다.
      if (onCommentSubmit) {
        onCommentSubmit(response.data);
      }
    } catch (error) {
      console.error("댓글 작성 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <h2>{parentId ? "대댓글 작성하기" : "댓글 작성하기"}</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder={
            parentId ? "대댓글을 작성하세요..." : "댓글을 작성하세요..."
          }
          required
        />
        <br />
        <button type="submit">
          {parentId ? "대댓글 작성하기" : "댓글 작성하기"}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
