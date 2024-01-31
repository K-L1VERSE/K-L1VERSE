import { useEffect } from "react";
import { useResetRecoilState } from "recoil";

import axios from "../../api/authAxios";
import { UserState } from "../../global/UserState";

function LogoutButton() {
  const resetUserState = useResetRecoilState(UserState);

  useEffect(() => {
    axios
      .get(`/user/auth/sign-out`)
      .then(() => {
        resetUserState();
        window.location.href = "http://localhost:3000/login";
      })
      .catch(() => {
        resetUserState();
        window.location.href = "http://localhost:3000/login";
      });
  }, []);
}

export default LogoutButton;
