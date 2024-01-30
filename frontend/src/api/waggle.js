import axios from "./axios";

const gateway = "board";
const url = "waggles";

export function getBoard(boardId) {
  return axios
    .get(`/${gateway}/${url}/${boardId}`)
    .then((response) => response.data);
}

export function createBoard(board) {
  return axios
    .post(`/${gateway}/${url}`, board)
    .then((response) => response.data);
}

export function updateBoard(board) {
  return axios
    .put(`/${gateway}/${url}/${board.boardId}`, board)
    .then((response) => response.data);
}

export function getLatestWaggle(success, fail) {
  axios.get(`/${gateway}/${url}/recent/2`).then(success).catch(fail);
}
