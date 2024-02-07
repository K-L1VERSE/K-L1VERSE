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

export function updateWaggle(boardId, board, success, fail) {
  axios.put(`/${gateway}/${url}/${boardId}`, board).then(success).catch(fail);
}

export function deleteWaggle(boardId, success, fail) {
  axios.delete(`/${gateway}/${url}/${boardId}`).then(success).catch(fail);
}

export function getLatestWaggle(success, fail) {
  axios.get(`/${gateway}/${url}/recent/2`).then(success).catch(fail);
}

export function likeWaggle(board, waggleId, success, fail) {
  axios
    .post(`/${gateway}/${url}/like/${waggleId}`, board)
    .then(success)
    .catch(fail);
}

export function unlikeWaggle(board, waggleId, success, fail) {
  axios
    .delete(`/${gateway}/${url}/likes/${waggleId}`, board)
    .then(success)
    .catch(fail);
}

export function likeCount(waggleId, success, fail) {
  axios.get(`/${gateway}/${url}/like/${waggleId}`).then(success).catch(fail);
}
