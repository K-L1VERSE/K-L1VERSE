import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import WaggleForm from "../../../styles/BoardStyles/BoardCreateStyle";

function WaggleRegistPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const location = useLocation();
  let boardId = location.state ? location.state.boardId : null;

  useEffect(() => {
    if (location.state && location.state.board) {
      setTitle(location.state.board.title);
      setContent(location.state.board.content);
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        board: {
          title,
          content,
        },
      };

      if (isUpdateMode) {
        await axios.put(`/board/waggles/${boardId}`, requestData);
        navigate(`/waggle/${boardId}`);
      } else {
        const response = await axios.post("/board/waggles", requestData);
        const boardTemp = response.data.board;
        boardId = boardTemp.boardId;
        navigate(`/waggle/${boardId}`);
      }
    } catch (error) {
      // console.error("Waggle 게시물 작성 또는 수정 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Waggle 게시물 수정" : "Waggle 게시물 작성"}</h1>
      <WaggleForm
        title={title}
        content={content}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onSubmit={handleSubmit}
        buttonText={isUpdateMode ? "수정하기" : "작성하기"}
      />
    </div>
  );
}

export default WaggleRegistPage;
