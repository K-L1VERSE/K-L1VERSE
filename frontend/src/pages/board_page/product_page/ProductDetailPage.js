import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  // const [productId, setProductId] = useState(0);
  const { boardId } = useParams();
  const navigate = useNavigate();

  /* product 상세 정보 가져오기 */
  function getProductDetail() {
    console.log(boardId);
    axios
      .get(`/products/${boardId}`)
      .then(({ data }) => {
        console.log("received data");
        setProductDetail(data.board);
        setProductId(data.waggleId);
      })
      .catch((err) => {
        console.log("Waggle 상세 정보를 불러오는 중 에러 발생:", err);
      });
  }

  useEffect(() => {
    console.log("boardId:" + boardId);
    getProductDetail();
  }, [boardId]);

  function handleUpdateBtn() {
    console.log(productDetail.boardId);
    navigate("/productegist", { state: { boardId: productDetail.boardId } });
  }

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
    </div>
  );
}

export default ProductDetailPage;
