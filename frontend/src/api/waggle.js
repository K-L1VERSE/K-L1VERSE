import axios from "./axios";

const url = "waggles";

export function getBoard(boardId) {
  return axios.get(`/${url}/${boardId}`).then((response) => response.data);
}

export function createBoard(board) {
  return axios.post(`/${url}`, board).then((response) => response.data);
}

export function updateBoard(board) {
  return axios
    .put(`/${url}/${board.boardId}`, board)
    .then((response) => response.data);
}

export function getLatestWaggle(success, fail) {
  axios.get(`/${url}/recent/2`).then(success).catch(fail);
}
