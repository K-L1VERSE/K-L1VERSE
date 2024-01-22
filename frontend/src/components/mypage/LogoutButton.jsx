import React from "react";

import axios from "../../api/axios";
// import mockAxios from "../../api/mockAxios";

function LogoutButton() {
  const logout = () => {
    axios.get("/users/logout").then(({ data }) => {
      //  로그아웃 전역 상태 관리

      console.log(data);

      //  로그아웃 후 메인 페이지로 이동
      // window.location.href = "/";
    });
  };

  return (
    <button type="button" onClick={logout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
