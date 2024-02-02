import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import CommentList from "../../../components/board/CommentList";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  // const [productId, setProductId] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* product 상세 정보 가져오기 */
  function getProductDetail() {
    axios.get(`/board/products/${boardId}`).then(({ data }) => {
      setProductDetail(data.board);
      // setProductId(data.productId);
    });
  }

  useEffect(() => {
    getProductDetail();
  }, [boardId]);

  function handleUpdateBtn() {
    navigate("/productRegist", { state: { boardId: productDetail.boardId } });
  }

  const handleDeleteBtn = async () => {
    try {
      await axios.delete(`/board/products/${boardId}`);
      navigate("/product");
    } catch (error) {
      // console.error("글 삭제 중 에러 발생:", error);
    }
  };

  const handleKeyDown = (event, clickHandler) => {
    if (event.key === "Enter") {
      clickHandler();
    }
  };

  return (
    <div className="container">
      <BoardTopNavBar />
      <div className="product-detail-box">
        <p>
          <strong>{productDetail.title}</strong>
        </p>
        <p>{productDetail.content}</p>
      </div>
      <button
        type="button"
        onClick={handleUpdateBtn}
        onKeyDown={(e) => handleKeyDown(e, handleUpdateBtn)}
      >
        수정하기
      </button>
      <button
        type="button"
        onClick={handleDeleteBtn}
        onKeyDown={(e) => handleKeyDown(e, handleDeleteBtn)}
      >
        삭제하기
      </button>

      <CommentList boardId={boardId} />
    </div>
  );
}

export default ProductDetailPage;
