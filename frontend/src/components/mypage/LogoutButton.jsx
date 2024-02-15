import React from "react";

import { useRecoilState } from "recoil";
import { UserState } from "../../global/UserState";

import axios from "../../api/axios";

function LogoutButton() {
  const [isLogin, setIsLogin] = useRecoilState(UserState);
  const logout = () => {
    axios.get("/users/logout").then(({ data }) => {
      localStorage.removeItem("accessToken");
      setIsLogin(false);
    });
  };

  return (
    <button type="button" onClick={logout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
