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
        // 새로 불러온 데이터가 없으면 더 이상 불러올 데이터가 없다고 설정
        setHasMore(false);
      } else {
        setProductList((prevProducts) => [...prevProducts, ...newProducts]);
      }
    } catch (error) {
      console.log("Product 게시판 목록을 불러오는 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (hasMore) {
      // hasMore가 true일 때만 추가 데이터를 불러오도록 설정
      fetchProductList();
    }
  }, [hasMore, fetchProductList]);

  function handleRegistProductClick() {
    // "중고거래 글 작성" 버튼 클릭 시 ProductRegistPage로 이동
    navigate("/productRegist");
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const distanceFromBottom = documentHeight - scrollTop - windowHeight;

    if (distanceFromBottom < 200 && !loading && hasMore) {
      // 스크롤이 아래에 도달하면 다음 페이지의 데이터를 불러옴
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
              {/* 클릭 시 상세 페이지로 이동하도록 Link 사용 */}
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
