import axios from "./axios";

const gateway = "user";
const url = "users";

export function checkUserGoal(data, success, fail) {
  axios.post(`/${gateway}/${url}/goal`, data).then(success).catch(fail);
}

export function getUserDetail(success, fail) {
  axios.get(`/${gateway}/${url}/mypage`).then(success).catch(fail);
}
