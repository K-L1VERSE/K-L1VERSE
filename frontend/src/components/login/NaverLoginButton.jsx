import React from "react";
import styled from "styled-components";
import Naver from "../../assets/login_button/naver-icon.png";

function NaverLoginButton() {
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const NAVER_STATE = process.env.REACT_APP_NAVER_STATE;
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  const handleLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <But>
      <img src={Naver} alt="Naver" onClick={handleLogin} />
    </But>
  );
}

const But = styled.div`
  padding: 0.6rem 0.6rem 0.4rem 0.6rem;
  border: 1px solid #edf0f3;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 1.5rem;
  }
`;

export default NaverLoginButton;
