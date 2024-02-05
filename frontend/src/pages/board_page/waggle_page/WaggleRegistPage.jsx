import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import RegistCard from "../../../components/board/WaggleRegistCard";
import { createWaggle, updateWaggle } from "../../../api/waggle";
import { UserState } from "../../../global/UserState";

import { RegistCardContainer } from "../../../styles/BoardStyles/BoardCreateStyle";

function WaggleRegistPage() {
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { userId, nickname } = useRecoilState(UserState)[0];

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.board) {
      setBoardId(location.state.board.boardId);
      setTitle(location.state.board.title);
      setContent(location.state.board.content);
      setIsUpdateMode(true);
    }
  }, [location]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", userId);
    formData.append("nickname", nickname);
    if (image) {
      formData.append("image", image);
    }

    if (isUpdateMode) {
      updateWaggle(
        boardId,
        { board: formData },
        () => {
          navigate(`/waggle/${boardId}`);
        },
        () => {},
      );
    } else {
      createWaggle(
        { board: formData },
        ({ data }) => {
          navigate(`/waggle/${data.board.boardId}`);
        },
        () => {},
      );
    }
  };

  return (
    <RegistCardContainer>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Waggle 수정중.." : "Waggle 작성중.."}</h1>
      <RegistCard
        title={title}
        content={content}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onImageChange={(e) => setImage(e.target.files[0])}
        onSubmit={handleSubmit}
        buttonText={isUpdateMode ? "수정하기" : "작성하기"}
      />
    </RegistCardContainer>
  );
}

export default WaggleRegistPage;
