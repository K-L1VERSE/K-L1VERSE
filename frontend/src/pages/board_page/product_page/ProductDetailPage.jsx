import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import axios from "../../../api/axios";
import CommentList from "../../../components/board/CommentList";
import Like from "../../../components/board/Like";
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
  DetailImgDiv,
  DetailOnlyImg,
  FormattedDate,
  Gray,
  DetailCommentCount,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
  ProductImage,
  ProductWriter,
  ProductWriterContainer,
  ProductWriterProfile,
  ProductWriterBadge,
  ProductImageWrapper,
  ProductImageTest,
} from "../../../styles/BoardStyles/ProductListStyle";
import { deleteProduct } from "../../../api/product";
import { UserState } from "../../../global/UserState";
import BackIcon from "../../../assets/icon/back-icon.png";
import {
  DeleteButton,
  EditButton,
} from "../../../styles/BoardStyles/CommentStyle";
import { ImageBoxContainer } from "../../../styles/BoardStyles/ImageStyle";
import Modal from "../../../components/common/Modal";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  const [productId, setProductId] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [dealFlag, setDealFlag] = useState();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { userId } = useRecoilState(UserState)[0];
  const [commentCount, setCommentCount] = useState(0);

  const location = useLocation();
  const { state } = location;

  const [modalVisible, setModalVisible] = useState(false);
  const [clickedImageUrl, setClickedImageUrl] = useState("");

  /* product 상세 정보 가져오기 */
  function getProductDetail() {
    axios.get(`/board/products/${boardId}`).then(({ data }) => {
      setProductId(data.productId);
      setProductDetail(data.board);
      setPrice(data.price);
      setDealFlag(data.dealFlag);
      setCommentCount(data.board.commentCount);
    });
  }

  useEffect(() => {
    getProductDetail();
  }, [boardId]);

  const handleUpdateBtn = () => {
    if (state && state.fromMypage) {
      navigate("/productRegist", {
        state: {
          board: productDetail,
          price,
          dealFlag,
          user: state.user,
          fromMypage: state.fromMypage,
          category: state.category,
        },
      });
    } else {
      navigate("/productRegist", {
        state: { board: productDetail, price, dealFlag },
      });
    }
  };

  const handleDeleteBtn = async () => {
    Swal.fire({
      html: `
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Bear.png" alt="Bear" width="100" height="100"/>
        <p style='font-size:1.2rem; font-family:Pretendard-Bold;'>게시글을 삭제하시겠습니까?</p>
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        "<div style='font-size:1rem; font-family:Pretendard-Regular;'>삭제</div>",
      cancelButtonText:
        "<div style='font-size:1rem; font-family:Pretendard-Regular;'>취소</div>",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(
          boardId,
          () => {
            if (state && state.fromMypage) {
              navigate("/mypage", {
                state: { user: state.user, category: state.category },
              });
            } else {
              navigate("/product");
            }
          },
          () => {},
        );
      }
    });
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
    if (state && state.fromMypage) {
      navigate("/mypage", {
        state: { user: state.user, category: state.category },
      });
    } else {
      navigate("/product");
    }
  };

  const handleImageClick = (imageUrl) => {
    setClickedImageUrl(imageUrl);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      {productDetail && productId && (
        <Container>
          <DetailTop>
            <BackButton onClick={handleBackClick}>
              <img src={BackIcon} alt="Back" />
            </BackButton>
            <ProductBoardTitle>
              <div>중고 거래 &nbsp;</div>
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png"
                alt="Coin"
                width="18"
                height="18"
              />
            </ProductBoardTitle>
          </DetailTop>
          <ProductImageWrapper>
            {productDetail.boardImage &&
              productDetail.boardImage
                .split(",")
                .map((imageUrl, index) => (
                  <ProductImageTest
                    key={productId}
                    src={imageUrl.trim()}
                    alt={`Product Image ${index}`}
                    onClick={() => handleImageClick(imageUrl.trim())}
                  />
                ))}
          </ProductImageWrapper>
          <DetailBox>
            <ForSpaceBetween>
              <ForSpace>
                <ProductWriterContainer>
                  <ProductWriterProfile src={productDetail.profile} />
                  <ProductWriter>{productDetail.nickname}</ProductWriter>
                  <ProductWriterBadge
                    src={`${process.env.PUBLIC_URL}/badge/badge${
                      productDetail.mainBadge === null
                        ? 0
                        : productDetail.mainBadge
                    }back.png`}
                  />
                </ProductWriterContainer>
                {dealFlag ? (
                  <DealStatusOrange>거래완료</DealStatusOrange>
                ) : (
                  <DealStatusGreen>거래가능</DealStatusGreen>
                )}
              </ForSpace>
              <EditDeleteButton>{renderEditDeleteButtons()}</EditDeleteButton>
            </ForSpaceBetween>
            <ForMargin />
            <Gray />
            <Title>{productDetail.title}</Title>
            <FormattedDate>
              {`${new window.Date(productDetail.createAt).toLocaleDateString(
                "ko-KR",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                },
              )} ${new window.Date(productDetail.createAt).toLocaleTimeString(
                "ko-KR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}`}
            </FormattedDate>

            <Price>{Number(price).toLocaleString()} 원</Price>
            <Content>{productDetail.content}</Content>
            {/* <ProductImageWrapper>
              {productDetail.boardImage &&
                productDetail.boardImage
                  .split(",")
                  .map((imageUrl, index) => (
                    <ProductImageTest
                      key={productId}
                      src={imageUrl.trim()}
                      alt={`Product Image ${index}`}
                      onClick={() => handleImageClick(imageUrl.trim())}
                    />
                  ))}
            </ProductImageWrapper> */}
            {/* <EditDeleteButton>{renderEditDeleteButtons()}</EditDeleteButton> */}
            <Bottom>
              <DetailCommentCount>
                <div>
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png"
                    alt="Love Letter"
                    width="25"
                    height="25"
                  />
                  댓글 수 {commentCount}
                </div>
              </DetailCommentCount>
            </Bottom>
            <Gray />
          </DetailBox>
          <CommentList boardId={boardId} setCommentCount={setCommentCount} />
        </Container>
      )}
      <Modal visible={modalVisible} onClose={handleCloseModal}>
        <img src={clickedImageUrl} alt="Modal Image" />
      </Modal>
    </div>
  );
}

export default ProductDetailPage;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const ProductBoardTitle = styled.div`
  display: flex;
  font-family: "Pretendard-Bold";
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  background-color: #e5edfb;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  align-items: center;
  color: #578cea;
`;

export const ForSpace = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const ForMargin = styled.div`
  /* height: 0.5rem; */
`;

export const ForSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
