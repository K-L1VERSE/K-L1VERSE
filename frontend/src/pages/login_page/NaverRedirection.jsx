// import axios from "axios";
// import { useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

function NaverRedirection() {
  console.log("NaverRedirection");

  const PARAMS = new URL(document.location).searchParams;
  const NAVER_CODE = PARAMS.get("code");
  //   const code = window.location.search;
  //   console.log(code);
  console.log("NAVER_CODE:", NAVER_CODE);

  return <div>로그인 중입니다.</div>;

  //   const code = new URL(window.location.href).searchParams.get("code"); // 현재 URL에서 코드만 추출
  //   const [cookies, setCookie] = useCookies();
  //   const navigate = useNavigate();

  //   // 컴포넌트가 마운트되면 로그인 로직 실행
  //   useEffect(() => {
  //     async function NaverLogin() {
  //     //   const res = await axios.get(
  //     //     process.env.REACT_APP_API +
  //     //       `/api/member/login/naver?code=${code}&state=${process.env.NAVER_STATE}`,
  //     //   ); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.
  //       const ACCESS_TOKEN = res.headers["authorization"];
  //       const REFRESH_TOKEN = res.headers["refresh-token"];
  //       setCookie("accessToken", ACCESS_TOKEN);
  //       setCookie("refreshToken", REFRESH_TOKEN);
  //     }
  //     NaverLogin();
  //     navigate("/", { replace: true }); // 로그인 완료시 메인으로 이동
  //   }, []);
}

export default NaverRedirection;
