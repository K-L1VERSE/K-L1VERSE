import axios from "./axios";

const gateway = "match";
const url = "matches";

export function getTodayMatch(success, fail) {
  axios.get(`/${gateway}/${url}/today`).then(success).catch(fail);
}
