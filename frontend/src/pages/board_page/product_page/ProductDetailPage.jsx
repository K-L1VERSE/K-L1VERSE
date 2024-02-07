import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";
import {
  Container,
  User,
  Title,
  Content,
  UpdateButton,
  DeleteButton,
  DetailBox,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
} from "../../../styles/BoardStyles/ProductListStyle";
import { deleteProduct } from "../../../api/product";
import { UserState } from "../../../global/UserState";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  const [price, setPrice] = useState(0);
  const [dealFlag, setDealFlag] = useState(false);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { userId } = useRecoilState(UserState)[0];

  /* product 상세 정보 가져오기 */
  function getProductDetail() {
    axios.get(`/board/products/${boardId}`).then(({ data }) => {
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

  const renderEditDeleteButtons = () => {
    if (userId === productDetail.userId) {
      return (
        <>
          <Button type="button" onClick={handleUpdateBtn}>
            수정
          </Button>
          <Button type="button" onClick={handleDeleteBtn}>
            삭제
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <Container>
      <BoardTopNavBar />
      <DetailBox>
        <User>
          <p>{productDetail.nickname}</p>
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
        {renderEditDeleteButtons()}
      </DetailBox>
      <CommentList boardId={boardId} />
    </Container>
  );
}

export default ProductDetailPage;
