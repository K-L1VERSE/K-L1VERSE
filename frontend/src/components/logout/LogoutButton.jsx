import { useEffect } from "react";
import { useResetRecoilState } from "recoil";

import axios from "../../api/authAxios";
import { UserState } from "../../global/UserState";

function LogoutButton() {
  const resetUserState = useResetRecoilState(UserState);

  const domain = process.env.REACT_APP_DOMAIN;

  useEffect(() => {
    axios
      .get(`/user/auth/sign-out`)
      .then(() => {
        resetUserState();
        window.location.href = `${domain}/login`;
      })
      .catch(() => {
        resetUserState();
        window.location.href = `${domain}/login`;
      });
  }, []);
}

export default LogoutButton;
