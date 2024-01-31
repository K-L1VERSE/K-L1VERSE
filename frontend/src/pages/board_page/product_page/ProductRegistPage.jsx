import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";

import * as boardApi from "../../../api/product";

function ProductRegistPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [dealFlag, setDealFlag] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const location = useLocation();
  let boardId = location.state ? location.state.boardId : null;

  useEffect(() => {
    if (boardId) {
      boardApi.getProduct(boardId).then((data) => {
        setTitle(data.board.title);
        setContent(data.board.content);
        setPrice(data.price);
        setDealFlag(data.dealFlag);
        setIsUpdateMode(true);
      });
    }
  }, [boardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        board: {
          title,
          content,
        },
        price,
        dealFlag,
      };

      if (isUpdateMode) {
        await axios.put(`/board/products/${boardId}`, requestData);
        navigate(`/product/${boardId}`);
      } else {
        const response = await axios.post("/board/products", requestData);
        const boardTemp = response.data.board;
        boardId = boardTemp.boardId;
        navigate(`/product/${boardId}`);
      }
    } catch (error) {
      console.error("Product 게시물 작성 또는 수정 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>{isUpdateMode ? "Product 게시물 수정" : "Product 게시물 작성"}</h1>
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
        가격:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        거래 여부:
        <input
          type="checkbox"
          checked={dealFlag}
          onChange={(e) => setDealFlag(e.target.checked)}
        />
        <br />
        <button type="submit">{isUpdateMode ? "수정하기" : "작성하기"}</button>
      </form>
    </div>
  );
}

export default ProductRegistPage;
