import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import ProductItemCard from "../../../components/Board/ProductItemCard";
import { formatRelativeTime } from "../../../components/Board/dateFormat";

import "../../../styles/BoardStyles/ProductListStyle.css";

function ProductListPage() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  /* Product 전체 글 가져오기 */
  const fetchProductList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/board/products/pages?page=${page}&size=30&sort=board.createAt,desc`,
      );
      const newProducts = response.data.content;

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProductList((prevProducts) => [...prevProducts, ...newProducts]);
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (hasMore) {
      fetchProductList();
    }
  }, [hasMore, fetchProductList]);

  function handleRegistProductClick() {
    navigate("/productRegist");
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const distanceFromBottom = documentHeight - scrollTop - windowHeight;

    if (distanceFromBottom < 200 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <BoardTopNavBar />
      <div className="product-header">
        <h2>📦너에겐 필요없지만 나에게 꼭 필요한 굿즈 구합니다</h2>
        <button onClick={handleRegistProductClick}>🖋글쓰기</button>
      </div>

      <div className="product-list">
        {productList.map((product, index) => (
          <ProductItemCard
            key={index}
            product={product}
            formatRelativeTime={formatRelativeTime}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
