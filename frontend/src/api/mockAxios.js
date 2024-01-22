import axios from "axios";

const instance = axios.create({
  baseURL: "https://92a6571b-4d69-4330-a868-b14794f678fb.mock.pstmn.io",
  params: {},
});

export default instance;
