import axios from "./axios";

const gateway = "board";
const url = "waggles";

export function getWaggleList(page, size, success, fail) {
  axios
    .get(
      `/${gateway}/${url}/pages?page=${page}&size=${size}&sort=board.createAt,desc`,
    )
    .then(success)
    .catch(fail);
}

export function getWaggleDetail(boardId) {
  axios.get(`/${gateway}/${url}/${boardId}`).then((response) => response.data);
}

export function createWaggle(board, success, fail) {
  axios.post(`/${gateway}/${url}`, board).then(success).catch(fail);
}

export function updateWaggle(board, boardId, success, fail) {
  axios.put(`/${gateway}/${url}/${boardId}`, board).then(success).catch(fail);
}

export function getLatestWaggle(success, fail) {
  axios.get(`/${gateway}/${url}/recent/2`).then(success).catch(fail);
}
