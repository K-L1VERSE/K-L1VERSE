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

  // useEffect(() => {
  //   if (location.state) {
  //     setBoardId(location.state.boardId);
  //   }
  // }, []);

  useEffect(() => {
    // waggleId가 제공되는 경우, 수정 모드임을 나타냄
    if (boardId) {
      // 기존 waggle 게시물을 가져와서 폼을 채움
      boardApi
        .getBoard(boardId)
        .then((data) => {
          setTitle(data.board.title);
          setContent(data.board.content);
          setIsUpdateMode(true);
        })
        .catch((e) => {
          console.log("Waggle 게시물을 불러오는 중 에러 발생:", e);
        });
    }
  }, [boardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        board: {
          boardType: "WAGGLE",
          title: title,
          content: content,
        },
      };

      if (isUpdateMode) {
        // 기존 waggle 게시물 업데이트
        axios
          .put(`/waggle/${boardId}`, requestData.board)
          .then((response) => {
            console.log("Waggle 게시물 수정 성공!");
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // 새로운 waggle 게시물 생성
        axios
          .post("/waggle", requestData)
          .then((response) => {
            console.log("Waggle 게시물 작성 성공!");
            const boardTemp = response.data.board;
            boardId = boardTemp.boardId;
            // Waggle 상세 페이지로 리디렉션
            navigate(`/waggle/${boardId}`);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.error("Waggle 게시물 작성 또는 수정 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Waggle 게시물 수정" : "Waggle 게시물 작성"}</h1>
      <form onSubmit={handleSubmit}>
        {/* <Link to={waggleId ? `/waggle/${waggle.boardId}` : "/waggle"} /> */}
        <br />
        제목:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          //   onChange={function (e) {
          //     setTitle(e.target.value);
          //   }}
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
