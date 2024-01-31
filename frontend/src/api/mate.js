import axios from "./axios";

const url = "mates";

export function getBoard(boardId) {
  return axios
    .get(`/board/${url}/${boardId}`)
    .then((response) => response.data);
}

export function createBoard(board) {
  return axios.post(`/board/${url}`, board).then((response) => response.data);
}

export function updateBoard(board) {
  return axios
    .put(`/board/${url}/${board.boardId}`, board)
    .then((response) => response.data);
}
