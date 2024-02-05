import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
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
} from "../../../styles/BoardStyles/BoardDetailStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../../styles/BoardStyles/ProductListStyle";
import { UserState } from "../../../global/UserState";
import { deleteProduct } from "../../../api/product";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  const [productId, setProductId] = useState(0);
  const [price, setPrice] = useState(0);
  const [dealFlag, setDealFlag] = useState(false);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { userId } = useRecoilState(UserState)[0];

  /* product 상세 정보 가져오기 */
  function getProductDetail() {
    axios.get(`/board/products/${boardId}`).then(({ data }) => {
      setProductId(data.productId);
      setProductDetail(data.board);
      setPrice(data.price);
      setDealFlag(data.dealFlag);
    });
  }

  useEffect(() => {
    getProductDetail();
  }, [boardId]);

  const handleUpdateBtn = () => {
    navigate("/productRegist", { state: { board: productDetail } });
  };

  const handleDeleteBtn = async () => {
    deleteProduct(
      boardId,
      () => {
        navigate("/product");
      },
      () => {},
    );
  };

  // const handleKeyDown = (event, clickHandler) => {
  //   if (event.key === "Enter") {
  //     clickHandler();
  //   }
  // };

  return (
    <Container>
      <BoardTopNavBar />
      <WaggleDetailBox>
        <User>
          <p>Username: {productDetail.nickname}</p>
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
      <UpdateButton onClick={handleUpdateBtn}>수정하기</UpdateButton>
      <DeleteButton onClick={handleDeleteBtn}>삭제하기</DeleteButton>
      <CommentList boardId={boardId} />
    </Container>
  );
}

export default ProductDetailPage;
