import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BoardTopNavbarContainer,
  Title,
  Nav,
  Button,
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
        <Button
          className={location.pathname.startsWith("/waggle") ? "active" : ""}
          onClick={() => handleNavigate("/waggle")}
        >
          ⚽️ 와글와글
        </Button>
        <Button
          className={location.pathname.startsWith("/mate") ? "active" : ""}
          onClick={() => handleNavigate("/mate")}
        >
          👋🏻 직관 메이트
        </Button>
        <Button
          className={location.pathname.startsWith("/product") ? "active" : ""}
          onClick={() => handleNavigate("/product")}
        >
          📦 중고거래
        </Button>
      </Nav>
    </BoardTopNavbarContainer>
  );
}

export default BoardTopNavbar;
