import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

function ProductListPage() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

  /* Product 전체 글 가져오기 */

  const getProductList = () => {
    axios
      .get(`/products/list`)
      .then(({ data }) => {
        setProductList(data.products);
      })
      .catch((err) => {
        console.log("Product 게시판 목록을 불러오는 중 에러 발생:", err);
      });
  };

  useEffect(() => {
    getProductList();
  }, []);

  function handleRegistProductClick() {
    // "중고거래 글 작성" 버튼 클릭 시 ProductRegistPage로 이동
    navigate("/productRegist");
  }

  return (
    <div>
      <h1>Product 게시판 목록</h1>
      <button onClick={handleRegistProductClick}>중고거래 글 작성</button>
      <ul>
        {productList.map((product) => (
          <li key={product.productId}>
            <strong>{product.title}</strong>: {product.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductListPage;
