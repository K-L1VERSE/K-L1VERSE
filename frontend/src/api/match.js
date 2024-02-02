import axios from "./axios";

const gateway = "match";
const url = "matches";

export function getTodayMatch(success, fail) {
  axios.get(`/${gateway}/${url}/today`).then(success).catch(fail);
}

export function getMatchList(year, month) {
  return axios
    .get(`/${gateway}/${url}/${year}/${month}`)
    .then((response) => response.data);
}

export function getMatchListByDate(year, month, date) {
  return axios
    .get(`/${gateway}/${url}/${year}/${month}/${date}`)
    .then((response) => response.data);
}

export function getMatchDetail(matchId) {
  return axios
    .get(`/${gateway}/${url}/${matchId}/details`)
    .then((response) => response.data);
}
