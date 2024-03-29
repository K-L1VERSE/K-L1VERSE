import React from "react";
import { Link } from "react-router-dom";
import {
  DealStatusGreen,
  DealStatusOrange,
  ProductItemPrice,
  ProductItemCreated,
  ProductItemContainer,
  ProductItemWriter,
  ProductImage,
  WriterContainer,
  WriterProfile,
  WriteBadge,
} from "../../styles/BoardStyles/ProductListStyle";
import {
  DealFlagContainer,
  ItemInfoItem,
  ItemInfoSection,
  ItemTitle,
} from "../../styles/BoardStyles/BoardStyle";
import { ReactComponent as Comment } from "../../assets/icon/comment-icon.svg";
import { ImageBoxContainer } from "../../styles/BoardStyles/ImageStyle";

function ProductItemCard({
  product,
  formatRelativeTime,
  user,
  fromMypage,
  category,
}) {
  const boardImage = product.board.boardImage
    ? product.board.boardImage.split(",").map((image) => image.trim())
    : [];

  const truncatedTitle =
    product.board.title.length > 10
      ? `${product.board.title.substring(0, 10)}...`
      : product.board.title;

  return (
    <Link
      to={`/product/${product.board.boardId}`}
      style={{ textDecoration: "none" }}
      state={{ user, fromMypage, category }}
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
            <ProductImage src={boardImage[0].trim()} alt="Product Image" />
          )}
        </ImageBoxContainer>
        <ItemTitle>{truncatedTitle}</ItemTitle>
        <ProductItemPrice>
          {Number(product.price).toLocaleString()}원
        </ProductItemPrice>
        <WriterContainer>
          <WriterProfile src={product.board.profile} />
          <ProductItemWriter>{product.board.nickname}</ProductItemWriter>
          <WriteBadge
            src={`${process.env.PUBLIC_URL}/badge/badge${product.board.mainBadge === null ? 0 : product.board.mainBadge}back.png`}
          />
        </WriterContainer>
        <ItemInfoSection>
          <ItemInfoItem>
            <Comment />
            댓글 {product.board.commentCount}
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
