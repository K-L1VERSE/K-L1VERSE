import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  params: {
  },
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("accessToken")
  },
});

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {

    // 응답에서 새로운 accessToken이 있는지 확인
    const newAccessToken = response.data.accessToken;

    if (newAccessToken) {
      // accessToken 갱신
      // Todo... Redux 사용 시 storage 대신 Redux로 교체
      localStorage.setItem('accessToken', newAccessToken);

      // 현재 페이지 리로드
      window.location.reload();
    }

    // 정상적인 응답 반환
    return response;
  },
  (err) => {
    // 에러 처리
    console.log(err);

    if (err.response && err.response.status === 401) {
      // UNAUTHORIZED 응답이면 로그인 페이지로 리다이렉션
      window.location.href = 'http://localhost:3000/login';
    }
  }
);

export default instance;
