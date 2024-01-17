import React from "react";

function Redirection() {
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  //   const code = window.location.search;
  //   console.log(code);
  console.log("KAKAO_CODE:", KAKAO_CODE);

  return <div>로그인 중입니다.</div>;
}

export default Redirection;
