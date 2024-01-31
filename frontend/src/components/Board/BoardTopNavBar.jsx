import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/BoardStyles/BoardTopNavbar.css";

function BoardTopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 각 버튼을 클릭했을 때 해당 페이지로 이동하는 함수
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="board-top-navbar">
      <h1>💬 커뮤니티</h1>
      <nav>
        <button
          className={location.pathname.includes("/waggle") ? "active" : ""}
          onClick={() => handleNavigate("/waggle")}
        >
          ⚽️ 와글와글
        </button>
        <button
          className={location.pathname.includes("/mate") ? "active" : ""}
          onClick={() => handleNavigate("/mate")}
        >
          👋🏻 직관 메이트
        </button>
        <button
          className={location.pathname.includes("/product") ? "active" : ""}
          onClick={() => handleNavigate("/product")}
        >
          📦 중고거래
        </button>
      </nav>
    </div>
  );
}

export default BoardTopNavbar;
