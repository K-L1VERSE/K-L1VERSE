import axios from "axios";

const domain = process.env.REACT_APP_DOMAIN;

const instance = axios.create({
  baseURL: `${domain}:8000`,
  params: {},
});

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = JSON.parse(
      localStorage.getItem("recoil-persist"),
    ).userState;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  () => {
    return Promise.reject(new Error("인증에 실패했습니다."));
  },
);

instance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.data.accessToken;

    if (newAccessToken) {
      const recoilData = JSON.parse(localStorage.getItem("recoil-persist"));
      recoilData.userState.accessToken = newAccessToken;

      localStorage.setItem("recoil-persist", JSON.stringify(recoilData));

      window.location.reload();
    }

    return response;
  },
  () => {
    if (err.response && err.response.status === 401) {
      window.location.href = `${domain}:3000/logout`;
    }
  },
);

export default instance;
