import React from "react";
import styled from "styled-components";
import Kakao from "../../assets/login_button/kakao.png";

function KakaoLoginButton() {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <But onClick={handleLogin}>
      <img src={Kakao} width="20" alt="" />
      <div>카톡으로 3초만에 로그인</div>
    </But>
  );
}

const But = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9e000;
  padding: 0.85rem 5rem;

  /* width: 20rem; */
  border-radius: 0.5rem;
  cursor: pointer;

  div {
    color: #47282a;
    font-size: 0.9rem;
    margin-left: 0.5rem;
    font-family: "Pretendard-Bold";
  }
`;

export default KakaoLoginButton;
