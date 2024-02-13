import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  DetailImgDiv,
  DetailOnlyImg,
  FormattedDate,
} from "../../../styles/BoardStyles/BoardDetailStyle";
import {
  DealStatusGreen,
  DealStatusOrange,
  ProductImage,
  ProductWriter,
  ProductWriterContainer,
  ProductWriterProfile,
  ProductWriterBadge,
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
          </DetailTop>
          <DetailImgDiv>
            {productDetail.boardImage &&
              productDetail.boardImage
                .split(",")
                .map((imageUrl, index) => (
                  <DetailOnlyImg
                    key={productId}
                    src={imageUrl.trim()}
                    alt={`Product Image ${index}`}
                    onClick={() => handleImageClick(imageUrl.trim())}
                  />
                ))}
          </DetailImgDiv>
          <DetailBox>
            <ProductWriterContainer>
              <ProductWriterProfile src={productDetail.profile} />
              <ProductWriter>{productDetail.nickname}</ProductWriter>
              <ProductWriterBadge
                src={`${process.env.PUBLIC_URL}/badge/badge${
                  productDetail.mainBadge === null ? 0 : productDetail.mainBadge
                }back.png`}
              />
            </ProductWriterContainer>
            {dealFlag ? (
              <DealStatusOrange>거래완료</DealStatusOrange>
            ) : (
              <DealStatusGreen>거래가능</DealStatusGreen>
            )}
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
            <EditDeleteButton>{renderEditDeleteButtons()}</EditDeleteButton>
          </DetailBox>
          <CommentList boardId={boardId} />
        </Container>
      )}
      <Modal visible={modalVisible} onClose={handleCloseModal}>
        <img src={clickedImageUrl} alt="Modal Image" />
      </Modal>
    </div>
  );
}

export default ProductDetailPage;
