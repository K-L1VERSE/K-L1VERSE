import React from "react";
import ProductItemCard from "./ProductItemCard";
import {
  ProductListContainer,
  ForWidth,
} from "../../styles/BoardStyles/ProductListStyle";

function ProductContainer({
  productList,
  formatRelativeTime,
  user,
  fromMypage,
  category,
}) {
  return (
    <ProductListContainer>
      <ForWidth>
        {productList.map((product) => (
          <ProductItemCard
            key={product.productId}
            product={product}
            formatRelativeTime={formatRelativeTime}
            user={user}
            fromMypage={fromMypage}
            category={category}
          />
        ))}
      </ForWidth>
    </ProductListContainer>
  );
}

export default ProductContainer;
