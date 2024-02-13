import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
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

  // 파일 상태를 업데이트하는 핸들러 함수
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
            </DetailTop>
            <DetailTop>
              {isUpdateMode ? "중고거래 게시물 수정" : "중고거래 게시물 작성"}
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
            />
          </>
        )
      ) : (
        <>
          <DetailTop>
            <BackButton onClick={handleBackClick}>
              <img src={BackIcon} alt="Back" />
            </BackButton>
          </DetailTop>
          <DetailTop>
            {isUpdateMode ? "중고거래 게시물 수정" : "중고거래 게시물 작성"}
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
          />
        </>
      )}
    </div>
  );
}

export default ProductRegistPage;
