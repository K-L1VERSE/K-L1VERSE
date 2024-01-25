import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";

function ProductListPage() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

  /* Product 전체 글 가져오기 */

  const getProductList = () => {
    axios
      .get(`/products`)
      .then(({ data }) => {
        setProductList(data);
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
          {productList.map((product) => (
            <tr key={product.board.boardId}>
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
    </div>
  );
}

export default ProductListPage;
