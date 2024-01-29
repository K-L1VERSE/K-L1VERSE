import axios from "./axios";

const url = "matches";

export function getTodayMatch(success, fail) {
  axios.get(`/${url}/today`).then(success).catch(fail);
}
