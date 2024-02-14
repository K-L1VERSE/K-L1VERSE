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

export async function getWaggleDetail(boardId, data, success, fail) {
  await axios
    .post(`/${gateway}/${url}/${boardId}`, data)
    .then(success)
    .catch(fail);
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

export function getSearchWaggleList(keyword, page, size, success, fail) {
  return axios
    .get(
      `/${gateway}/${url}/searchPaged?keyword=${keyword}&page=${page}&size=${size}&sort=board.createAt,desc`,
    )
    .then(success)
    .catch(fail);
}

export function likeWaggle(waggleId, data, success, fail) {
  axios
    .post(`/${gateway}/${url}/like/${waggleId}`, data)
    .then(success)
    .catch(fail);
}

export function unlikeWaggle(waggleId, data, success, fail) {
  axios
    .delete(`/${gateway}/${url}/like/${waggleId}`, { data: data })
    .then(success)
    .catch(fail);
}

export function likeCount(waggleId, success, fail) {
  axios.get(`/${gateway}/${url}/like/${waggleId}`).then(success).catch(fail);
}

export function uploadFile(formData) {
  return axios.post(`/${gateway}/file/upload`, formData);
}
