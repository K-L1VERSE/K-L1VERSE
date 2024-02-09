import React from "react";
import { Link } from "react-router-dom";
import {
  DealStatusGreen,
  DealStatusOrange,
  ProductItemPrice,
  ProductItemCreated,
  ProductItemContainer,
  ProductItemWriter,
} from "../../styles/BoardStyles/ProductListStyle";
import {
  DealFlagContainer,
  ItemInfoItem,
  ItemInfoSection,
  ItemTitle,
} from "../../styles/BoardStyles/BoardStyle";
import { ReactComponent as Comment } from "../../assets/icon/comment-icon.svg";
import { ImageBoxContainer } from "../../styles/BoardStyles/ImageStyle";

function ProductItemCard({ product, formatRelativeTime }) {
  const boardImage = product.board.boardImage
    ? product.board.boardImage.split(",").map((image) => image.trim())
    : [];

  return (
    <Link
      to={`/product/${product.board.boardId}`}
      style={{ textDecoration: "none" }}
    >
      <ProductItemContainer>
        <DealFlagContainer>
          {product.dealFlag ? (
            <DealStatusOrange>거래완료</DealStatusOrange>
          ) : (
            <DealStatusGreen>거래가능</DealStatusGreen>
          )}
        </DealFlagContainer>
        <ImageBoxContainer>
          {product.board.boardImage && product.board.boardImage.length > 0 && (
            // 첫 번째 이미지만 출력
            <ProductImage src={boardImage[0].trim()} alt="Product Image" />
          )}
        </ImageBoxContainer>
        <ItemTitle>{product.board.title}</ItemTitle>
        <ProductItemPrice>가격: {product.price}원</ProductItemPrice>
        <ProductItemWriter>{product.board.nickname}</ProductItemWriter>
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
    </Link>
  );
}

export default ProductItemCard;
