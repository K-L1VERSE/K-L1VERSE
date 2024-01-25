import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function RecentProductCard() {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // 최근 2개의 waggle 게시물을 가져오는 API 호출
    axios
      .get("/products/recent/2")
      .then((response) => {
        // API에서 받아온 데이터 중 최근 2개만 추출
        const recentTwoProducts = response.data.slice(0, 2);
        setRecentProducts(recentTwoProducts);
      })
      .catch((error) => {
        console.error("Error fetching recent products:", error);
      });
  }, []);

  return (
    <div>
      <h2>📦너에겐 필요없지만 나에게 꼭 필요한 굿즈 구합니다</h2>
      <ul>
        {recentProducts.map((product) => (
          <li key={product.id}>
            <p>{product.title}</p>
            <p>{product.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentProductCard;
