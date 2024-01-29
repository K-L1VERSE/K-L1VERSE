import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import CommentList from "../../../components/Board/CommentList";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* product 상세 정보 가져오기 */
  function getProductDetail() {
    axios.get(`/products/${boardId}`).then(({ data }) => {
      setProductDetail(data.board);
      setIsLiked(data.isLiked);
      setLikeCount(data.likeCount);
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
    } catch (error) {
      // console.error("글 삭제 중 에러 발생:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = isLiked
        ? await axios.delete(`/products/like/${productDetail.board.productId}`)
        : await axios.post(`/products/like/${productDetail.board.productId}`);

      setIsLiked(!isLiked);
      setProductDetail(response.data.board);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      // console.error("좋아요 처리 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <BoardTopNavBar />
      <h1>Product 상세 정보</h1>
      <p>
        <strong>Title:</strong> {productDetail.title}
      </p>
      <p>
        <strong>Content:</strong> {productDetail.content}
      </p>
      <div onClick={() => handleUpdateBtn()}>수정하기</div>
      <div onClick={() => handleDeleteBtn()}>삭제하기</div>

      <div>
        <button onClick={handleLikeClick}>{isLiked ? "♡" : "♥︎"}</button>
        <span>좋아요 {likeCount}개</span>
      </div>
      <CommentList boardId={boardId} />
    </div>
  );
}

export default ProductDetailPage;
