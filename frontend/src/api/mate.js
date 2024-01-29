import axios from "./axios";

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
