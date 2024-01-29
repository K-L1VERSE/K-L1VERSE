import axios from "./axios";

const url = "mates";

// boardId 보내기
export function getBoard(boardId) {
  return axios.get(`/mates/${boardId}`).then((response) => response.data);
}

export function createBoard(board) {
  return axios.post("/mates", board).then((response) => response.data);
}

export function updateBoard(board) {
  return axios
    .put(`/mates/${board.boardId}`, board)
    .then((response) => response.data);
}

export function getLatestMate(success, fail) {
  axios.get(`/${url}/recent/2`).then(success).catch(fail);
}
