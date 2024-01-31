// WaggleItemCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/BoardStyles/WaggleListStyle.css";

function WaggleItemCard({ waggle, formatRelativeTime }) {
  return (
    <div className="waggle-item">
      <div className="title">
        <Link
          to={`/waggle/${waggle.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          {waggle.board.title}
        </Link>
      </div>
      <div className="content">
        <Link
          to={`/waggle/${waggle.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{waggle.board.content}</p>
        </Link>
      </div>
      <div className="info-section">
        <div className="waggle-like">좋아요 {waggle.likesCount} |</div>
        <div className="waggle-comment">댓글 {waggle.board.commentCount} |</div>
        <div className="waggle-created-at">
          {formatRelativeTime(waggle.board.createAt)}
        </div>
      </div>
      <div className="separator" />
    </div>
  );
}

export default WaggleItemCard;
