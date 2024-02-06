import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import ProductRegistCard from "../../../components/board/ProductRegistCard";
import { createProduct, updateProduct } from "../../../api/product";
import { UserState } from "../../../global/UserState";

import { RegistCardContainer } from "../../../styles/BoardStyles/BoardCreateStyle";

function ProductRegistPage() {
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [dealFlag, setDealFlag] = useState(false);
  const [boardImage, setBoardImage] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { userId, nickname } = useRecoilState(UserState)[0];

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.board) {
      setBoardId(location.state.board.boardId);
      setTitle(location.state.board.title);
      setContent(location.state.board.content);
      setPrice(location.state.board.price);
      setDealFlag(location.state.board.dealFlag);
      setBoardImage(location.state.board.boardImage);
      setIsUpdateMode(true);
    }
  }, [location]);

  const handleSubmit = () => {
    if (isUpdateMode) {
      updateProduct(
        boardId,
        {
          board: {
            title,
            content,
            boardImage,
          },
          price,
          dealFlag,
        },
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
            // nickname,
            boardImage,
          },
          price,
          dealFlag,
        },
        ({ data }) => {
          navigate(`/product/${data.board.boardId}`);
        },
        () => {},
      );
    }
  };

  return (
    <RegistCardContainer>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Product 게시물 수정" : "Product 게시물 작성"}</h1>
      <ProductRegistCard
        title={title}
        content={content}
        price={price}
        dealFlag="false"
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onPriceChange={(e) => setPrice(e.target.value)}
        onImageChange={(e) => setBoardImage(e.target.files[0])}
        onSubmit={handleSubmit}
        buttonText={isUpdateMode ? "수정하기" : "작성하기"}
      />
    </RegistCardContainer>
  );
}

export default ProductRegistPage;
