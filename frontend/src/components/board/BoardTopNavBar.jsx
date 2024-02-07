import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BoardTopNavbarContainer,
  Title,
  Nav,
  WaggleButton,
  MateButton,
  ProductButton,
} from "../../styles/BoardStyles/BoardTopNavbarStyle";

function BoardTopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <BoardTopNavbarContainer>
      <Title>💬 커뮤니티</Title>
      <Nav>
        <WaggleButton
          className={location.pathname.startsWith("/waggle") ? "active" : ""}
          onClick={() => handleNavigate("/waggle")}
        >
          ⚽️ 와글와글
        </WaggleButton>
        <MateButton
          className={location.pathname.startsWith("/mate") ? "active" : ""}
          onClick={() => handleNavigate("/mate")}
        >
          👋🏻 직관 메이트
        </MateButton>
        <ProductButton
          className={location.pathname.startsWith("/product") ? "active" : ""}
          onClick={() => handleNavigate("/product")}
        >
          📦 중고거래
        </ProductButton>
      </Nav>
    </BoardTopNavbarContainer>
  );
}

export default BoardTopNavbar;
