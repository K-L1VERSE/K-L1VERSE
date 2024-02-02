import React from "react";
import ProductItemCard from "./ProductItemCard";
import { ProductListContainer } from "../../styles/BoardStyles/ProductListStyle";

function ProductContainer({ productList, formatRelativeTime }) {
  return (
    <ProductListContainer>
      {productList.map((product) => (
        <ProductItemCard
          key={product.productId}
          product={product}
          formatRelativeTime={formatRelativeTime}
        />
      ))}
    </ProductListContainer>
  );
}

export default ProductContainer;
