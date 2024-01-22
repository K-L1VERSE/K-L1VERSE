import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";

function ProductListPage() {
  const [productList, setProductList] = useState({
    boardId: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    userId: "",
    nickname: "",
  });

  /* Product 전체 글 가져오기 */
  useEffect(() => {
    const getProductList = () => {
      axios
        .get("/products/list")
        .then(({ data }) => {
          setProductList(data);
        })
        .catch((err) => {
          console.log("Product 게시판 목록을 불러오는 중 에러 발생:", err);
        });
    };

    getProductList();
  }, []);

  return (
    <div>
      <h1>Product 게시판 목록</h1>
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
