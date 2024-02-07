import React from "react";
import styled from "styled-components";

import GoogleLoginImg from "../../assets/login_button/google_login_medium_narrow.png";

function GoogleLoginButton() {
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <div>
      <LoginButton type="button" onClick={handleLogin} />
    </div>
  );
}

const LoginButton = styled.button`
  width: 183px;
  height: 45px;
  padding-top: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #dcdcdc;
  background-image: url(${GoogleLoginImg});
  background-size: contain;
  border-radius: 8px;
  transition: box-shadow 0.5s ease;
  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export default GoogleLoginButton;
