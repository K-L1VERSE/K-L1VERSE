// ProductListPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../../../api/product";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import ProductItemCard from "../../../components/board/ProductItemCard";
import { formatRelativeTime } from "../../../components/board/dateFormat";
import {
  ProductHeader,
  ProductHeaderH2,
  ProductHeaderButton,
  ProductListContainer,
} from "../../../styles/BoardStyles/ProductListStyle";

function ProductListPage() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  function getProducts() {
    getProductList(
      page,
      30,
      ({ data }) => {
        if (!data.content) {
          setHasMore(false);
        } else {
          setProductList([...productList, ...data.content]);
          setPage(page + 1);
        }
      },
      () => {},
    );
  }

  useEffect(() => {
    getProducts();
  }, []);

  const [isBottom, setIsBottom] = useState(false);

  if (hasMore) {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      if (scrollTop + window.innerHeight >= scrollHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  }

  useEffect(() => {
    if (isBottom) {
      getProducts();
    }
  }, [isBottom]);

  const handleWriteProductclick = () => {
    navigate("/productRegist");
  };

  return (
    <div>
      <BoardTopNavBar />
      <ProductHeader>
        <ProductHeaderH2>
          📦너에겐 필요없지만 나에게 꼭 필요한 굿즈
        </ProductHeaderH2>
        <ProductHeaderButton onClick={handleWriteProductclick}>
          🖋글쓰기
        </ProductHeaderButton>
      </ProductHeader>

      <ProductListContainer>
        {productList.map((product) => (
          <ProductItemCard
            key={product.productId}
            product={product}
            formatRelativeTime={formatRelativeTime}
          />
        ))}
      </ProductListContainer>
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default ProductListPage;
