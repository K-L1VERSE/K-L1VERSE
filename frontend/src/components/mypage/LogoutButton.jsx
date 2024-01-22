import React from "react";

function LogoutButton() {
  const logout = () => {
    console.log("로그아웃");
  };

  return (
    <button type="button" onClick={logout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
