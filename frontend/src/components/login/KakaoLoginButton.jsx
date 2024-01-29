import React from "react";
import styled from "styled-components";

import KakaoLoginImg from "../../assets/login_button/kakao_login_medium_narrow.png";

// eslint-disable-next-line react/prop-types
function KakaoLoginButton() {
  const KakaoRestApiKey = "4762e8102a9a8a8096d725c00ae8205d"; // REST API KEY
  const KaKaoRedirectUri = "http://localhost:3000/KakaoAuth/"; // Redirect URI

  // const KakaoRestApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  // const KaKaoRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  // oauth 요청 URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoRestApiKey}&redirect_uri=${KaKaoRedirectUri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <LoginButton onClick={handleLogin} />
    </div>
  );
}

const LoginButton = styled.button`
  width: 183px;
  height: 45px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  background-image: url(${KakaoLoginImg});

  &:hover {
    filter: brightness(0.7);
  }
`;

export default KakaoLoginButton;
