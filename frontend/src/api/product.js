import axios from "./axios";

const url = "products";

export function getProduct(boardId) {
  return axios.get(`/${url}/${boardId}`).then((response) => response.data);
}

export function createProduct(board) {
  return axios.post(`/${url}`, board).then((response) => response.data);
}

export function updateProduct(board) {
  return axios
    .put(`/${url}/${board.boardId}`, board)
    .then((response) => response.data);
}

export function getLatestProduct(success, fail) {
  axios.get(`/${url}/recent/2`).then(success).catch(fail);
}
