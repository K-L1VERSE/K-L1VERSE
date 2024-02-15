import axios from "axios";

const domain = process.env.REACT_APP_DOMAIN;
const domainAndPort = process.env.REACT_APP_DOMAIN_AND_PORT;

const instance = axios.create({
  baseURL: `${domain}:8000`,
  params: {},
});

instance.interceptors.request.use(
  (config) => {
    const recoilData = localStorage.getItem("recoil-persist");
    let accessToken = null;
    if (recoilData) {
      accessToken = JSON.parse(recoilData).userState.accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (
      ![
        "/login",
        "/logout",
        "/KakaoAuth/",
        "/GoogleAuth",
        "/NaverAuth/",
        "/survey",
        "/question/1",
        "/question/2",
        "/question/3",
        "/question/4",
        "/question/5",
        "/question/6",
        "/question/7",
        "/result",
      ].includes(window.location.pathname)
    ) {
      window.location.href = `${domainAndPort}/login`;
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
      const recoilData = localStorage.getItem("recoil-persist");
      let accessToken = null;
      if (recoilData) {
        const jsonRecoilData = JSON.parse(recoilData);
        accessToken = JSON.parse(recoilData).userState.accessToken;
        jsonRecoilData.userState.accessToken = newAccessToken;
        localStorage.setItem("recoil-persist", JSON.stringify(jsonRecoilData));
      }

      window.location.reload();
    }

    return response;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      if (err.response.headers.authorization) {
        const newAccessToken = err.response.headers.authorization.split(" ")[1];
        const recoilData = localStorage.getItem("recoil-persist");
        if (recoilData) {
          const jsonRecoilData = JSON.parse(recoilData);
          jsonRecoilData.userState.accessToken = newAccessToken;
          localStorage.setItem(
            "recoil-persist",
            JSON.stringify(jsonRecoilData),
          );
          window.location.reload();
        }
      } else {
        window.location.href = `${domainAndPort}/login`;
      }
    }
  },
);

export default instance;
