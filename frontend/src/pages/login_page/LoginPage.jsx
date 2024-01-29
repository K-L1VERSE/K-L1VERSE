import React from "react";

import styled from "styled-components";

import NaverLoginButton from "../../components/login/NaverLoginButton";
import GoogleLoginButton from "../../components/login/GoogleLoginButton";
import KakaoLoginButton from "../../components/login/KakaoLoginButton";

function LoginPage() {
  return (
    <LoginButtonContainer>
      <KakaoLoginButton />
      <NaverLoginButton />
      <GoogleLoginButton />
    </LoginButtonContainer>
  );
}

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  height: 20rem;

  justify-content: center;
  align-items: center;
`;

export default LoginPage;
