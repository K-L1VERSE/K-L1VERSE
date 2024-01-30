// ProductItemCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/BoardStyles/ProductListStyle.css";

function ProductItemCard({ product, formatRelativeTime }) {
  const dealStatusClass = product.dealFlag
    ? "deal-status-orange"
    : "deal-status-green";

  return (
    <div className="product-item">
      <div className={`deal-status ${dealStatusClass}`}>
        {product.dealFlag ? "거래완료" : "거래가능"}
      </div>
      <div className="title">
        <Link
          to={`/product/${product.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          {product.board.title}
        </Link>
      </div>
      <div className="content">
        <Link
          to={`/product/${product.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{product.board.content}</p>
        </Link>
      </div>
      <div className="info-section">
        <div className="product-price">가격: {product.price}원</div>
        <div className="product-comment">
          댓글 {product.board.commentCount} |
        </div>
        <div className="product-created-at">
          생성일: {formatRelativeTime(product.board.createAt)}
        </div>
      </div>
      <div className="separator" />
    </div>
  );
}

export default ProductItemCard;
