import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";

import * as boardApi from "../../../api/mate";

function MateRegistPage() {
  const navigate = useNavigate();
  // const { mateId } = useParams();

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
          boardType: "MATE",
          title: title,
          content: content,
        },
      };

      if (isUpdateMode) {
        axios.put(`/mates/${boardId}`, requestData.board);
      } else {
        axios.post("/mates", requestData).then((response) => {
          const boardTemp = response.data.board;
          boardId = boardTemp.boardId;
          navigate(`/mates/${boardId}`);
        });
      }
    } catch (error) {
      // console.error("Mate 게시물 작성 또는 수정 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Mate 게시물 수정" : "Mate 게시물 작성"}</h1>
      <form onSubmit={handleSubmit}>
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

export default MateRegistPage;
