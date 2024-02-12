import React from "react";
import styled from "styled-components";
import Google from "../../assets/login_button/google-icon.png";

function GoogleLoginButton() {
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <But>
      <img src={Google} alt="Naver" onClick={handleLogin} />
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

export default GoogleLoginButton;
