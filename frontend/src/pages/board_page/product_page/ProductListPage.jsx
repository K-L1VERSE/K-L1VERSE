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
  HeaderDiv,
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
        if (!data) {
          setHasMore(false);
        } else {
          setProductList([...productList, ...data]);
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
        <HeaderDiv>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Wrapped%20Gift.png"
            alt="Wrapped Gift"
            width="25"
            height="25"
          />
          <div>나에게 꼭 필요한 굿-즈</div>
        </HeaderDiv>
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
