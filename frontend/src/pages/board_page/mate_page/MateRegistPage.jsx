import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import WaggleRegistCard from "../../../components/board/WaggleRegistCard";
import { createMate, updateMate } from "../../../api/mate";
import { UserState } from "../../../global/UserState";

import { RegistCardContainer } from "../../../styles/BoardStyles/BoardCreateStyle";

function MateRegistPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdateMode] = useState(false);
  const { userId } = useRecoilState(UserState)[0];

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.board) {
      setTitle(location.state.board.title);
      setContent(location.state.board.content);
    }
  }, [location]);

  const boardId = location.state ? location.state.boardId : null;

  const handleSubmit = () => {
    if (isUpdateMode) {
      updateMate(
        {
          board: {
            title,
            content,
          },
        },
        boardId,
        () => {
          navigate(`/mate/${boardId}`);
        },
        () => {},
      );
    } else {
      createMate(
        {
          board: {
            boardType: "MATE",
            title,
            content,
            userId,
          },
        },
        ({ data }) => {
          navigate(`/mate/${data.board.boardId}`);
        },
        () => {
          console.error("Mate 게시물 작성 중 에러 발생");
        },
      );
    }
  };

  return (
    <RegistCardContainer>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Mate 게시물 수정" : "Mate 게시물 작성"}</h1>
      <WaggleRegistCard
        title={title}
        content={content}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onSubmit={handleSubmit}
        buttonText={isUpdateMode ? "수정하기" : "작성하기"}
      />
    </RegistCardContainer>
  );
}

export default MateRegistPage;
