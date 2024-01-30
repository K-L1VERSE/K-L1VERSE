import axios from "./axios";

const url = "products";

export function getProduct(boardId) {
  return axios
    .get(`/board/${url}/${boardId}`)
    .then((response) => response.data);
}

export function createProduct(board) {
  return axios.post(`/board/${url}`, board).then((response) => response.data);
}

export function updateProduct(board) {
  return axios
    .put(`/board/${url}/${board.boardId}`, board)
    .then((response) => response.data);
}
