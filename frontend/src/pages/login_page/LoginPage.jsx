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
        <LoginContent>
          ※ 구글 로그인과 네이버 로그인은 개발자 계정으로만 가능합니다
        </LoginContent>
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

const LoginContent = styled.div`
  font-size: 0.75rem;
  color: gray;
  text-align: center;
  margin-top: -0.3rem;
`;
