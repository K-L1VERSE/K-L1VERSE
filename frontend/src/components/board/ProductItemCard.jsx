import React from "react";
import { Link } from "react-router-dom";
import {
  ProductItemContainer,
  DealStatusGreen,
  DealStatusOrange,
  ProductItemTitle,
  ProductItemContent,
  ProductItemInfoSection,
  ProductItemPrice,
  ProductItemComment,
  ProductItemCreatedAt,
  ProductItemSeparator,
} from "../../styles/BoardStyles/ProductListStyle";

function ProductItemCard({ product, formatRelativeTime }) {
  // const dealStatusClass = product.dealFlag
  //   ? "deal-status-orange"
  //   : "deal-status-green";

  return (
    <ProductItemContainer>
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
      <ProductItemSeparator />
    </ProductItemContainer>
  );
}

export default ProductItemCard;
