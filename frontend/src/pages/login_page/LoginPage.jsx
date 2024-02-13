import React from "react";

import styled from "styled-components";

import NaverLoginButton from "../../components/login/NaverLoginButton";
import GoogleLoginButton from "../../components/login/GoogleLoginButton";
import KakaoLoginButton from "../../components/login/KakaoLoginButton";
import LoginLogo from "../../components/login/LoginLogo";

function LoginPage() {
  localStorage.removeItem("recoil-persist");

  return (
    <>
      <LoginLogo />
      <LoginContainer>
        <KakaoLoginButton />
        <Bottom>
          <GoogleLoginButton />
          <NaverLoginButton />
        </Bottom>
      </LoginContainer>
    </>
  );
}

export default LoginPage;

const LoginContainer = styled.div`
  /* background-color: red; */
  width: 20rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Bottom = styled.div`
  display: flex;
  margin: 1rem auto;
  width: 7rem;
  justify-content: space-between;
`;
