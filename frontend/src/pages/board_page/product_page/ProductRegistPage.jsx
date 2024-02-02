import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import ResigistCard from "../../../components/board/ResigistCard";
import { createProduct, updateProduct } from "../../../api/product";
import { UserState } from "../../../global/UserState";

function ProductRegistPage() {
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
      updateProduct(
        {
          board: {
            title,
            content,
          },
        },
        boardId,
        () => {
          navigate(`/product/${boardId}`);
        },
        () => {},
      );
    } else {
      createProduct(
        {
          board: {
            boardType: "PRODUCT",
            title,
            content,
            userId,
          },
        },
        ({ data }) => {
          navigate(`/product/${data.board.boardId}`);
        },
        () => {
          console.error("Product 게시물 작성 중 에러 발생");
        },
      );
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Product 게시물 수정" : "Product 게시물 작성"}</h1>
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

export default ProductRegistPage;
