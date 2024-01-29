// MateItemCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/BoardStyles/MateListStyle.css";

function MateItemCard({ mate }) {
  return (
    <div className="mate-item">
      <div className="title">
        <Link
          to={`/mate/${mate.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          {mate.board.title}
        </Link>
      </div>
      <div className="content">
        <Link
          to={`/mate/${mate.board.boardId}`}
          style={{ textDecoration: "none" }}
        >
          <p>{mate.board.content}</p>
        </Link>
      </div>
      <div className="info-section">
        <div className="mate-created-at" />
      </div>
      <div className="separator" />
    </div>
  );
}

export default MateItemCard;
