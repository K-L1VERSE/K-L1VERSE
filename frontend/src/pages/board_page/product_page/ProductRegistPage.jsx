import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "styled-components";
import ProductRegistCard from "../../../components/board/ProductRegistCard";
import { createProduct, updateProduct } from "../../../api/product";
import { UserState } from "../../../global/UserState";

import { DetailTop } from "../../../styles/BoardStyles/BoardCreateStyle";
import { BackButton } from "../../../styles/BoardStyles/BoardDetailStyle";
import BackIcon from "../../../assets/icon/back-icon.png";

function ProductRegistPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [boardId, setBoardId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [dealFlag, setDealFlag] = useState(false);
  const [boardImage, setBoardImage] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { userId } = useRecoilState(UserState)[0];
  const [file] = useState(null);

  useEffect(() => {
    if (location.state && location.state.board) {
      setBoardId(location.state.board.boardId);
      setTitle(location.state.board.title);
      setContent(location.state.board.content);
      setPrice(location.state.price);
      setDealFlag(location.state.dealFlag);
      setBoardImage(location.state.board.boardImage);
      setIsUpdateMode(true);
    }
  }, [location]);

  const handleSubmit = () => {
    if (boardImage === null) {
      Swal.fire({
        html: `
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
          <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">이미지 업로드가 필수에요!</div>
        `,
        confirmButtonColor: "#3085d6",
        confirmButtonText:
          "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
      });
      return;
    }
    if (title.length === 0) {
      Swal.fire({
        html: `
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
          <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">제목을 입력해주세요!</div>
        `,
        confirmButtonColor: "#3085d6",
        confirmButtonText:
          "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
      });
      return;
    }
    if (content.length === 0) {
      Swal.fire({
        html: `
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
          <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">내용을 입력해주세요!</div>
        `,
        confirmButtonColor: "#3085d6",
        confirmButtonText:
          "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
      });
      return;
    }

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
          if (state && state.fromMypage) {
            navigate(`/product/${boardId}`, {
              state: {
                user: state.user,
                fromMypage: state.fromMypage,
                category: state.category,
              },
            });
          } else {
            navigate(`/product/${boardId}`);
          }
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

  const handleBackClick = () => {
    if (isUpdateMode) {
      if (state && state.fromMypage) {
        navigate(`/product/${boardId}`, {
          state: {
            user: state.user,
            fromMypage: state.fromMypage,
            category: state.category,
          },
        });
      } else {
        navigate(`/product/${boardId}`);
      }
    } else {
      navigate("/product");
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      setBoardImage(file);
    }
  };

  useEffect(() => {
    handleFileChange(file);
  }, [file]);

  const handleDealFlag = () => {
    if (isUpdateMode) {
      setDealFlag(!dealFlag);
    } else {
      Swal.fire({
        html: `
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Hatching%20Chick.png" alt="Hatching Chick" width="100" height="100" />
          <div style="font-size:1rem; font-family:Pretendard-Regular; margin-top: 1rem;">작성중에는 변경할 수 없어요!</div>
        `,
        confirmButtonColor: "#3085d6",
        confirmButtonText:
          "<div style='font-size:1rem; font-family:Pretendard-Regular;'>확인</div>",
      });
    }
  };

  return (
    <div>
      {location.state ? (
        isUpdateMode && (
          <>
            <DetailTop>
              <BackButton onClick={handleBackClick}>
                <img src={BackIcon} alt="Back" />
              </BackButton>
              <ProductBoardTitle>
                <div>
                  {isUpdateMode ? "중고거래 글수정" : "중고거래 글쓰기"}
                </div>
                <img
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png"
                  alt="Coin"
                  width="18"
                  height="18"
                />
              </ProductBoardTitle>
            </DetailTop>
            <ProductRegistCard
              title={title}
              content={content}
              price={price}
              dealFlag={dealFlag}
              onTitleChange={(e) => setTitle(e.target.value)}
              onContentChange={(e) => setContent(e.target.value)}
              onPriceChange={(e) => setPrice(e.target.value)}
              boardImage={boardImage}
              onFileChange={handleFileChange}
              onSubmit={handleSubmit}
              buttonText={isUpdateMode ? "수정하기" : "작성하기"}
              handleDealFlag={handleDealFlag}
              setBoardImage={setBoardImage}
            />
          </>
        )
      ) : (
        <>
          <DetailTop>
            <BackButton onClick={handleBackClick}>
              <img src={BackIcon} alt="Back" />
            </BackButton>

            <ProductBoardTitle>
              <div>{isUpdateMode ? "중고거래 수정" : "중고거래 글쓰기"}</div>
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png"
                alt="Coin"
                width="22"
                height="22"
              />
            </ProductBoardTitle>
          </DetailTop>
          <ProductRegistCard
            title={title}
            content={content}
            price={price}
            dealFlag={dealFlag}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            onPriceChange={(e) => setPrice(e.target.value)}
            boardImage={boardImage}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            buttonText={isUpdateMode ? "수정하기" : "작성하기"}
            handleDealFlag={handleDealFlag}
            setBoardImage={setBoardImage}
          />
        </>
      )}
    </div>
  );
}

export default ProductRegistPage;

export const ProductBoardTitle = styled.div`
  display: flex;
  font-family: "Pretendard-Bold";
  margin: 0 auto;
  margin-bottom: 1rem;
  background-color: #e5edfb;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  align-items: center;
  color: #578cea;
  font-size: 0.85rem;

  img {
    margin-left: 0.1rem;
    margin-bottom: 0.1rem;
  }
`;
