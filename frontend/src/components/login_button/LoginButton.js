import React from "react";

// eslint-disable-next-line react/prop-types
function LoginButton({ type }) {
  // const KakaoRestApiKey = "4762e8102a9a8a8096d725c00ae8205d"; // REST API KEY
  // const KaKaoRedirectUri = "http://localhost:3000/"; // Redirect URI

  const KakaoRestApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KaKaoRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  // oauth 요청 URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoRestApiKey}&redirect_uri=${KaKaoRedirectUri}&response_type=code`;

  const loginType = type;
  let loginText;
  if (loginType === 1) {
    loginText = "카카오 로그인";
  } else if (loginType === 2) {
    loginText = "구글 로그인";
  } else if (loginType === 3) {
    loginText = "네이버 로그인";
  }

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        {loginText}
      </button>
    </div>
  );
}

export default LoginButton;
