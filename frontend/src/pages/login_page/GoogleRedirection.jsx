import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { get } from "jquery";
import axios from "../../api/axios";
import { UserState } from "../../global/UserState";
import { NotificationState } from "../../global/NotificationState";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

function GoogleRedirection() {
  const PARAMS = new URL(document.location).searchParams;
  const GOOGLE_CODE = PARAMS.get("code");

  const setUserState = useSetRecoilState(UserState);

  const request = axios
    .get(`/login/oauth/code/google?code=${GOOGLE_CODE}`)
    .then((res) => {
      console.log(res);

      const email = res.data.email;
      const domain = res.data.domain;

      /* access Token 받고 전역 변수로 관리 */
      setUserState({
        nickname: res.data.nickname, 
        profile: res.data.profile, 
        accessToken: res.data.accessToken,
        email: res.data.email,
        domain: res.data.domain,
      });

      /* 성공시 홈화면으로 */
      window.location.href = "/main";
    })
    .catch((err) => {
      console.log(err);
      // window.location.href = "/login";
    });

  console.log(request);
  

  return <div>로그인 중입니다.</div>;
}

export default GoogleRedirection;
