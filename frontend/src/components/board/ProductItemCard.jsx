import React from "react";
import { Link } from "react-router-dom";
import {
  DealStatusGreen,
  DealStatusOrange,
  ProductItemTitle,
  ProductItemContent,
  ProductItemInfoSection,
  ProductItemPrice,
  ProductItemComment,
  ProductItemCreatedAt,
} from "../../styles/BoardStyles/ProductListStyle";
import { ItemContainer } from "../../styles/BoardStyles/BoardStyle";

function ProductItemCard({ product, formatRelativeTime }) {
  return (
    <ItemContainer>
      {product.dealFlag ? (
        <DealStatusOrange>거래완료</DealStatusOrange>
      ) : (
        <DealStatusGreen>거래가능</DealStatusGreen>
      )}
      <ProductItemTitle>
        <Link
          to={`/product/${product.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          {product.board.title}
        </Link>
      </ProductItemTitle>
      <ProductItemContent>
        <Link
          to={`/product/${product.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{product.board.content}</p>
        </Link>
      </ProductItemContent>
      <ProductItemInfoSection>
        <ProductItemPrice>가격: {product.price}원</ProductItemPrice>
        <ProductItemComment>
          댓글 {product.board.commentCount} |
        </ProductItemComment>
        <ProductItemCreatedAt>
          {formatRelativeTime(product.board.createAt)}
        </ProductItemCreatedAt>
      </ProductItemInfoSection>
    </ItemContainer>
  );
}

export default ProductItemCard;
