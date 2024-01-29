import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function RecentProductCard() {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    axios.get("/products/recent/2").then((response) => {
      const recentTwoProducts = response.data.slice(0, 2);
      setRecentProducts(recentTwoProducts);
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
