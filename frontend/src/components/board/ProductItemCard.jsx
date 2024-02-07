import React from "react";
import { Link } from "react-router-dom";
import {
  DealStatusGreen,
  DealStatusOrange,
  ProductItemTitle,
  ProductItemPrice,
  ProductItemCreated,
  ProductItemContainer,
} from "../../styles/BoardStyles/ProductListStyle";
import {
  DealFlagContainer,
  ItemContent,
  ItemInfoItem,
  ItemInfoSection,
} from "../../styles/BoardStyles/BoardStyle";
import { ReactComponent as Comment } from "../../assets/icon/comment-icon.svg";

function ProductItemCard({ product, formatRelativeTime }) {
  return (
    <ProductItemContainer>
      <DealFlagContainer>
        {product.dealFlag ? (
          <DealStatusOrange>거래완료</DealStatusOrange>
        ) : (
          <DealStatusGreen>거래가능</DealStatusGreen>
        )}
      </DealFlagContainer>

      <ProductItemTitle>
        <Link
          to={`/product/${product.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          {product.board.title}
        </Link>
      </ProductItemTitle>
      <ItemContent>
        <Link
          to={`/product/${product.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{product.board.content}</p>
        </Link>
      </ItemContent>
      <ProductItemPrice>가격: {product.price}원</ProductItemPrice>
      <ItemInfoSection>
        <ItemInfoItem>
          <Comment />
          댓글 {product.board.commentCount} |
        </ItemInfoItem>
        <ProductItemCreated>
          {formatRelativeTime(product.board.createAt)}
        </ProductItemCreated>
      </ItemInfoSection>
    </ProductItemContainer>
  );
}

export default ProductItemCard;
