import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../api/axios";

function MateRegistPage() {
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/mates", { title, content });
      console.log("Mate 게시물 작성 성공!");
      nav("/mate");
    } catch (error) {
      console.error("Mate 게시물 작성 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <h1>직관 메이트 게시물 작성</h1>
      <form onSubmit={handleSubmit}>
        제목:
        <input type="text" value={title} onChange={handleTitleChange} />
        <br />
        내용:
        <textarea value={content} onChange={handleContentChange} />
        <br />
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
}

export default MateRegistPage;
