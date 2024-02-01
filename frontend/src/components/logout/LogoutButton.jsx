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
        window.location.href = "http://i10a409.p.ssafy.io/login";
      })
      .catch(() => {
        resetUserState();
        window.location.href = "http://i10a409.p.ssafy.io/login";
      });
  }, []);
}

export default LogoutButton;
