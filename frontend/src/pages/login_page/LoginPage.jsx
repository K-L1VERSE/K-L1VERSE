import React from "react";

import NaverLoginButton from "../../components/login/NaverLoginButton";
import GoogleLoginButton from "../../components/login/GoogleLoginButton";
import KakaoLoginButton from "../../components/login/KakaoLoginButton";

function LoginPage() {
  return (
    <div>
      <KakaoLoginButton />
      <NaverLoginButton />
      <GoogleLoginButton />
    </div>
  );
}

export default LoginPage;
