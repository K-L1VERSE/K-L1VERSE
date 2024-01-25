import React, { useState } from "react";
import axios from "../../api/axios";

const CommentForm = ({ boardId, parentId, onCommentSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/comments/" + (parentId ? parentId : boardId),
        {
          content: content,
        },
      );

      console.log("댓글이 작성되었습니다!");
      console.log("댓글 내용:", response.data.content);

      // 서버로부터 새로운 댓글 데이터를 받아와 부모 컴포넌트로 전달
      onCommentSubmit(response.data);

      // 작성된 댓글 내용 초기화
      setContent("");
    } catch (error) {
      console.error("댓글 작성 중 에러 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        댓글 내용:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default CommentForm;
