import axios from "./axios";

const gateway = "board";
const url = "mates";

export function getMateList(page, size, success, fail) {
  axios
    .get(
      `/${gateway}/${url}/pages?page=${page}&size=${size}&sort=board.createAt,desc`,
    )
    .then(success)
    .catch(fail);
}

export function getMateDetail(boardId) {
  axios.get(`/${gateway}/${url}/${boardId}`).then((response) => response.data);
}

export function createMate(board, success, fail) {
  axios.post(`/${gateway}/${url}`, board).then(success).catch(fail);
}

export function updateMate(boardId, board, success, fail) {
  axios.put(`/${gateway}/${url}/${boardId}`, board).then(success).catch(fail);
}

export function deleteMate(boardId, success, fail) {
  axios.delete(`/${gateway}/${url}/${boardId}`).then(success).catch(fail);
}

export function getLatestMate(success, fail) {
  axios.get(`/${gateway}/${url}/recent/2`).then(success).catch(fail);
}

export function getMatesByMatchList(matchId, page, success, fail) {
  axios
    .get(
      `/${gateway}/${url}/matesByMatchList?matchIds=${matchId}&page=${page}&size=10&sort=board.createAt,desc`,
    )
    .then(success)
    .catch(fail);
}
