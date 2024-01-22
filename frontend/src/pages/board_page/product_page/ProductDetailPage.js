import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";

function ProductDetailPage() {
  const [productDetail, setProductDetail] = useState({});
  const { boardId } = useParams();

  /* product 상세 정보 가져오기 */
  const getProductDetail = () => {
    axios
      .get(`/products/${boardId}`)
      .then(({ data }) => {
        setProductDetail(data);
      })
      .catch((err) => {
        console.log("product 상세 정보를 불러오는 중 에러 발생:", err);
      });
  };

  useEffect(() => {
    getProductDetail();
  }, [boardId]); // board_id가 변경될 때마다 useEffect 실행

  return (
    <div>
      <h1>Product 상세 정보</h1>
      <p>
        <strong>Title:</strong> {productDetail.title}
      </p>
      <p>
        <strong>Content:</strong> {productDetail.content}
      </p>
    </div>
  );
}

export default ProductDetailPage;
