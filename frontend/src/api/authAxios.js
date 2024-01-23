import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  params: {
  },
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("accessToken")
  },
});

export default instance;
