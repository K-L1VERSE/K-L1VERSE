import React from "react";
import { useSetRecoilState } from "recoil";
import { get } from "jquery";
import axios from "../../api/axios";
import { UserState } from "../../global/UserState";

function KaKaoRedirection() {
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  
  const setUserState = useSetRecoilState(UserState);

  const request = axios
    .get(`/login/oauth/code/kakao?code=${KAKAO_CODE}`)
    .then((res) => {
      console.log(res);

      /* access Token 받고 전역 변수로 관리 */
      setUserState({
        nickname: res.data.nickname, 
        profile: res.data.profile, 
        accessToken: res.data.accessToken,
        email: res.data.email,
        domain: res.data.domain,
        isLoggedIn: true,
      });

      /* 성공시 홈화면으로 */
      // window.location.href = "/main";
    })
    .catch((err) => {
      console.log(err);
      // window.location.href = "/login";
    });

  console.log(request);

  return <div>로그인 중입니다.</div>;
}

export default KaKaoRedirection;
