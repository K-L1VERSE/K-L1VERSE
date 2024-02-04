import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  Container,
  WaggleDetailBox,
  User,
  Title,
  Content,
  UpdateButton,
  DeleteButton,
  DealFlag,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../../styles/BoardStyles/ProductListStyle";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  const [price, setPrice] = useState(0);
  const [dealFlag, setDealFlag] = useState(false);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* product 상세 정보 가져오기 */
  useEffect(() => {
    async function getProductDetail() {
      try {
        const { data } = await axios.get(`/board/products/${boardId}`);
        setProductDetail(data.board);
        setPrice(data.price);
        setDealFlag(data.dealFlag);
      } catch (error) {
        // Handle error
      }
    }
    getProductDetail();
  }, [boardId]);

  const handleUpdateBtn = () => {
    navigate("/productRegist", { state: { boardId: productDetail.boardId } });
  };

  const handleDeleteBtn = async () => {
    try {
      await axios.delete(`/board/products/${boardId}`);
      navigate("/product");
    } catch (error) {
      // Handle error
    }
  };

  const handleKeyDown = (event, clickHandler) => {
    if (event.key === "Enter") {
      clickHandler();
    }
  };

  return (
    <Container>
      <BoardTopNavBar />
      <WaggleDetailBox>
        <User>
          <p>Username: {productDetail.username}</p>
        </User>
        {dealFlag ? (
          <DealStatusOrange>거래완료</DealStatusOrange>
        ) : (
          <DealStatusGreen>거래가능</DealStatusGreen>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Title>{productDetail.title}</Title>
        </div>
        <Content>{productDetail.content}</Content>
        <p>Price: {price}</p>
      </WaggleDetailBox>
      <UpdateButton
        onClick={handleUpdateBtn}
        onKeyDown={(e) => handleKeyDown(e, handleUpdateBtn)}
      >
        수정하기
      </UpdateButton>
      <DeleteButton
        onClick={handleDeleteBtn}
        onKeyDown={(e) => handleKeyDown(e, handleDeleteBtn)}
      >
        삭제하기
      </DeleteButton>
      <CommentList boardId={boardId} />
    </Container>
  );
}

export default ProductDetailPage;
