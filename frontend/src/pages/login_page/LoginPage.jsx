import React from "react";

import styled from "styled-components";

import NaverLoginButton from "../../components/login/NaverLoginButton";
import GoogleLoginButton from "../../components/login/GoogleLoginButton";
import KakaoLoginButton from "../../components/login/KakaoLoginButton";
import LoginLogo from "../../components/login/LoginLogo";

function LoginPage() {
  localStorage.removeItem("recoil-persist");

  return (
    <Box>
      <LoginLogo />
      <LoginButtonContainer>
        <KakaoLoginButton />
        <NaverLoginButton />
        <GoogleLoginButton />
      </LoginButtonContainer>
    </Box>
  );
}

const Box = styled.div`
  margin: 0 auto;
  margin-top: 6rem;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  height: 15rem;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
