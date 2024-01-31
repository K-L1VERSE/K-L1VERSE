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
  border: none;
  background-color: transparent;
  cursor: pointer;

  border-radius: 6px;
  border: 1px solid #dcdcdc;

  background-image: url(${GoogleLoginImg});
  background-size: contain;

  &:hover {
    filter: brightness(0.7);
  }
`;

export default GoogleLoginButton;
