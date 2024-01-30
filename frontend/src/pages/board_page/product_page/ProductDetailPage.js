import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import CommentList from "../../../components/Board/CommentList";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* product 상세 정보 가져오기 */
  function getProductDetail() {
    axios.get(`/products/${boardId}`).then(({ data }) => {
      setProductDetail(data);
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
      await axios.delete(`/products/${boardId}`);
      navigate("/product");
    } catch (error) {
      // console.error("글 삭제 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>Product 상세 정보</h1>

      {productDetail.board && (
        <>
          <p>
            <strong>Title:</strong> {productDetail.board.title}
          </p>
          <p>
            <strong>Content:</strong> {productDetail.board.content}
          </p>
          <p>
            <strong>Price:</strong> {productDetail.price}
          </p>
          <p>
            <strong>Deal Flag:</strong> {productDetail.dealFlag ? "Yes" : "No"}
          </p>
          <div onClick={() => handleUpdateBtn()}>수정하기</div>
          <div onClick={() => handleDeleteBtn()}>삭제하기</div>

          <CommentList boardId={boardId} />
        </>
      )}
    </div>
  );
}

export default ProductDetailPage;
