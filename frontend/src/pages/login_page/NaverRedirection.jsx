import React from "react";
import Lottie from "react-lottie";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import axios from "../../api/axios";
import { UserState } from "../../global/UserState";
import footballJson from "../../assets/football.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: footballJson,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function NaverRedirection() {
  const PARAMS = new URL(document.location).searchParams;
  const NAVER_CODE = PARAMS.get("code");

  const setUserState = useSetRecoilState(UserState);

  axios
    .get(`/user/login/oauth/code/naver?code=${NAVER_CODE}`)
    .then((res) => {
      /* access Token 받고 전역 변수로 관리 */
      setUserState({
        nickname: res.data.nickname,
        profile: res.data.profile,
        accessToken: res.data.accessToken,
        email: res.data.email,
        domain: res.data.domain,
        userId: res.data.userId,
        mainBadge: res.data.mainBadge,
        isLoggedIn: true,
        notificationFlag: res.data.notificationFlag,
      });

      /* 성공시 홈화면으로 */
      window.location.href = "/";
    })
    .catch(() => {
      // window.location.href = "/login";
    });

  return (
    <div>
      <WaitForLogin>
        <Lottie options={defaultOptions} height={100} width={400} />
        <div>loading...</div>
      </WaitForLogin>
    </div>
  );
}

const WaitForLogin = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    font-family: "iA Writer Quattro";
  }
`;

export default NaverRedirection;
