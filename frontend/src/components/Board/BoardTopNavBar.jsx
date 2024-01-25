import React from "react";
import { useNavigate } from "react-router-dom";

function BoardTopNavbar() {
  const navigate = useNavigate();

  // 각 버튼을 클릭했을 때 해당 페이지로 이동하는 함수
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>커뮤니티</h1>
      <nav>
        {/* 각 버튼을 클릭하면 해당 페이지로 이동하는 함수를 호출 */}
        <button onClick={() => handleNavigate("/waggle")}>Waggle</button>
        <button onClick={() => handleNavigate("/mate")}>Mate</button>
        <button onClick={() => handleNavigate("/product")}>Product</button>
      </nav>
    </div>
  );
}

export default BoardTopNavbar;
