import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";

import * as boardApi from "../../../api/waggle";

function WaggleRegistPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const location = useLocation();
  let boardId = location.state ? location.state.boardId : null;

  useEffect(() => {
    if (boardId) {
      boardApi.getBoard(boardId).then((data) => {
        setTitle(data.board.title);
        setContent(data.board.content);
        setIsUpdateMode(true);
      });
    }
  }, [boardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        board: {
          boardType: "WAGGLE",
          title,
          content,
        },
      };

      if (isUpdateMode) {
        axios.put(`/waggles/${boardId}`, requestData.board);
      } else {
        // 새로운 waggle 게시물 생성
        axios.post("/waggles", requestData).then((response) => {
          const boardTemp = response.data.board;
          boardId = boardTemp.boardId;
          navigate(`/waggle/${boardId}`);
        });
      }
    } catch (error) {
      // console.error("Waggle 게시물 작성 또는 수정 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Waggle 게시물 수정" : "Waggle 게시물 작성"}</h1>
      <form onSubmit={handleSubmit}>
        {" "}
        <br />
        제목:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        내용:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">{isUpdateMode ? "수정하기" : "작성하기"}</button>
      </form>
    </div>
  );
}

export default WaggleRegistPage;
