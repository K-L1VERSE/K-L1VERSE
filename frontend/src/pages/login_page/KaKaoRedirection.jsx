import React from "react";

import axios from "../../api/axios";

function KaKaoRedirection() {
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  //   const code = window.location.search;
  //   console.log(code);
  console.log("KAKAO_CODE:", KAKAO_CODE);

  const request = axios
    .get(`/login/oauth/code/kakao?code=${KAKAO_CODE}`)
    .then((res) => {
      console.log(res);

      /* access Token 받고 전역 변수로 관리 */
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("nickname", res.data.nickname);
      localStorage.setItem("profile", res.data.profile);
      localStorage.setItem("domain", res.data.domain);
    })
    .catch((err) => {
      console.log(err);
      window.location.href = "/login";
    });

  console.log(request);

  return <div>로그인 중입니다.</div>;
}

export default KaKaoRedirection;
