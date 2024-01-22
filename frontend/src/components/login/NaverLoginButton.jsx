import React from "react";

function NaverLoginButton() {
  // const NAVER_RESPONSE_TYPE = "code"
  const NAVER_REDIRECT_URI = "http://localhost:3000/NaverAuth/";
  const NAVER_STATE = "1234asdf";
  // const NAVER_SCOPE = "profile"
  const NAVER_CLIENT_ID = "eXJ_cTAVvlCn3lXE5sY6";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  return (
    <a href={NAVER_AUTH_URL}>
      <button type="button">네이버 로그인</button>
    </a>
  );
}

export default NaverLoginButton;
