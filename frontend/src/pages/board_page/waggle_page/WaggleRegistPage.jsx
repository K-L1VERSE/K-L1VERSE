import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import ResigistCard from "../../../components/board/ResigistCard";
import { createWaggle, updateWaggle } from "../../../api/waggle";
import { UserState } from "../../../global/UserState";

function WaggleRegistPage() {
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
      updateWaggle(
        {
          board: {
            title,
            content,
          },
        },
        boardId,
        () => {
          navigate(`/waggle/${boardId}`);
        },
        () => {},
      );
    } else {
      createWaggle(
        {
          board: {
            boardType: "WAGGLE",
            title,
            content,
            userId,
          },
        },
        ({ data }) => {
          navigate(`/waggle/${data.board.boardId}`);
        },
        () => {
          console.error("Waggle 게시물 작성 중 에러 발생");
        },
      );
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Waggle 게시물 수정" : "Waggle 게시물 작성"}</h1>
      <ResigistCard
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
