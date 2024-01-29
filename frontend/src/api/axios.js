import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  params: {},
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 여기에 요청 전에 수행할 작업을 추가할 수 있습니다.
    
    const recoilData = localStorage.getItem('recoil-persist');
    let accessToken = null;
    if(recoilData) {
      // 요청 헤더에 accessToken 추가
      accessToken = JSON.parse(recoilData).userState.accessToken;
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // 요청 에러 처리
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);
  
// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {

  // 응답에서 새로운 accessToken이 있는지 확인
  const newAccessToken = response.data.accessToken;

  if (newAccessToken) {
    // accessToken 갱신
    const recoilData = localStorage.getItem('recoil-persist');
    let accessToken = null;
    if(recoilData) {
      const jsonRecoilData = JSON.parse(recoilData);
      accessToken = JSON.parse(recoilData).userState.accessToken;
      jsonRecoilData.userState.accessToken = newAccessToken;
      localStorage.setItem('recoil-persist', JSON.stringify(jsonRecoilData));
    }

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
        window.location.href = 'http://localhost:3000/logout';
    }
  }
);

export default instance;
