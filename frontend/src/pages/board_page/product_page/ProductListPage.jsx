// ProductListPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../../../api/product";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import { formatRelativeTime } from "../../../components/board/dateFormat";
import ProductContainer from "../../../components/board/ProductContainer";
import {
  Header,
  HeaderButton,
  HeaderH2,
} from "../../../styles/BoardStyles/BoardStyle";

function ProductListPage() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  function getProducts() {
    getProductList(
      page,
      10,
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

  const handleWriteProductClick = () => {
    navigate("/productRegist");
  };

  return (
    <div>
      <BoardTopNavBar />
      <Header>
        <HeaderH2>📦 나에게 꼭 필요한 굿-즈</HeaderH2>
        <HeaderButton onClick={handleWriteProductClick}>🖋 글쓰기</HeaderButton>
      </Header>

      <ProductContainer
        productList={productList}
        formatRelativeTime={formatRelativeTime}
      />
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default ProductListPage;
