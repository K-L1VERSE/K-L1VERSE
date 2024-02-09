import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "../../../api/axios";
import CommentList from "../../../components/board/CommentList";
import {
  Container,
  User,
  Title,
  Content,
  DetailBox,
  EditDeleteButton,
  DetailTop,
  BackButton,
  Price,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
  ProductImage,
  ProductWriter,
} from "../../../styles/BoardStyles/ProductListStyle";
import { deleteProduct } from "../../../api/product";
import { UserState } from "../../../global/UserState";
import BackIcon from "../../../assets/icon/back-icon.png";
import {
  DeleteButton,
  EditButton,
} from "../../../styles/BoardStyles/CommentStyle";
import { ImageBoxContainer } from "../../../styles/BoardStyles/ImageStyle";

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
          <EditButton type="button" onClick={handleUpdateBtn}>
            수정
          </EditButton>
          <DeleteButton type="button" onClick={handleDeleteBtn}>
            삭제
          </DeleteButton>
        </>
      );
    }
    return null;
  };

  const handleBackClick = () => {
    navigate("/product");
  };

  return (
    <Container>
      <DetailTop>
        <BackButton onClick={handleBackClick}>
          <img src={BackIcon} alt="Back" />
        </BackButton>
      </DetailTop>
      <ImageBoxContainer>
        {productDetail.boardImage &&
          productDetail.boardImage
            .split(",")
            .map((imageUrl, index) => (
              <ProductImage
                key={index}
                src={imageUrl.trim()}
                alt={`Product Image ${index}`}
              />
            ))}
      </ImageBoxContainer>
      <DetailBox>
        <ProductWriter>
          <p>{productDetail.nickname}</p>
        </ProductWriter>
        {dealFlag ? (
          <DealStatusOrange>거래완료</DealStatusOrange>
        ) : (
          <DealStatusGreen>거래가능</DealStatusGreen>
        )}
        <Title>{productDetail.title}</Title>
        <Price>Price: {price}</Price>
        <Content>{productDetail.content}</Content>

        <EditDeleteButton>{renderEditDeleteButtons()}</EditDeleteButton>
      </DetailBox>
      <CommentList boardId={boardId} />
    </Container>
  );
}

export default ProductDetailPage;
