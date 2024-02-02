import React from "react";
import styled from "styled-components";

import KakaoLoginImg from "../../assets/login_button/kakao_login_medium_narrow.png";

function KakaoLoginButton() {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <ButtonContainer>
      <LoginButton onClick={handleLogin} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  height: 45px;
  border: none;
`;

const LoginButton = styled.button`
  width: 183px;
  height: 45px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  background-image: url(${KakaoLoginImg});
  back &:hover {
    filter: brightness(0.7);
  }
`;

export default KakaoLoginButton;
