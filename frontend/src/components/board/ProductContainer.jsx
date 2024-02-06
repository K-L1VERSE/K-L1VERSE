import React from "react";
import ProductItemCard from "./ProductItemCard";
import { ListContainer } from "../../styles/BoardStyles/BoardStyle";

function ProductContainer({ productList, formatRelativeTime }) {
  return (
    <ListContainer>
      {productList.map((product) => (
        <ProductItemCard
          key={product.productId}
          product={product}
          formatRelativeTime={formatRelativeTime}
        />
      ))}
    </ListContainer>
  );
}

export default ProductContainer;
