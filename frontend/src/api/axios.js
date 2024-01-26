import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  params: {},
});

// Todo...
// instance.interceptors.response.use(
//   (response) => {

//     // 로그인 시 백엔드 서버에서 보낸 정보들 저장
//     // Todo... Redux 사용 시 storage 대신 Redux로 교체
//     const newAccessToken = response.data.accessToken;

//     if (newAccessToken) {
//       // accessToken 갱신
//       // Todo... Redux 사용 시 storage 대신 Redux로 교체
//       localStorage.setItem('accessToken', newAccessToken);

//       // 현재 페이지 리로드
//       window.location.reload();
//     }

//     // 정상적인 응답 반환
//     return response;
//   },
//   (err) => {
//     // 에러 처리
//     console.log(err);

//     if (err.response && err.response.status === 401) {
//       // UNAUTHORIZED 응답이면 로그인 페이지로 리다이렉션
//       window.location.href = 'http://localhost:3000/login';
//     }
//   }
// );

export default instance;
