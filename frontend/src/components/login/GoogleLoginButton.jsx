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
    <But onClick={handleLogin}>
      <img src={Google} alt="Google" />
    </But>
  );
}

const But = styled.div`
  padding: 0.5em 0.7rem 0.6rem 0.7rem;
  border: 1px solid #edf0f3;
  display: flex;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 1.3rem;
  }
`;

export default GoogleLoginButton;
