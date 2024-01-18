import React from "react";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function GoogleLoginButton() {
  const GOOGLE_REDIRECT_URI = "http://localhost:3000/GoogleAuth";
  const GOOGLE_CLIENT_ID =
    "651679120216-gedguefmg8lgjhi8vul42c48r9305mol.apps.googleusercontent.com";
  //   const GOOGLE_CLIENT_SECURE_PW = "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";

  const handleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${GOOGLE_CLIENT_ID}
		&redirect_uri=${GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        구글 로그인
      </button>

      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleLoginButton;
