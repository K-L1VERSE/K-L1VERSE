import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";

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
      const response = await axios.get(`/products/pages?page=${page}&size=30`);
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
      <h1>📦너에겐 필요없지만 나에게 꼭 필요한 굿즈 구합니다</h1>
      <button onClick={handleRegistProductClick}>🖋글쓰기</button>
      <table border="1">
        <thead>
          <tr>
            <th>제목</th>
            <th>글 내용</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index}>
              <td>
                <Link to={`/products/${product.board.boardId}`}>
                  {product.board.title}
                </Link>
              </td>
              <td>{product.board.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default ProductListPage;
