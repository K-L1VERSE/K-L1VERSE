import axios from "./axios";

const gateway = "board";
const url = "products";

export function getProduct(boardId) {
  return axios
    .get(`/${gateway}/${url}/${boardId}`)
    .then((response) => response.data);
}

export function createProduct(board) {
  return axios
    .post(`/${gateway}/${url}`, board)
    .then((response) => response.data);
}

export function updateProduct(board) {
  return axios
    .put(`/${gateway}/${url}/${board.boardId}`, board)
    .then((response) => response.data);
}

export function getLatestProduct(success, fail) {
  axios.get(`/${gateway}/${url}/recent/2`).then(success).catch(fail);
}
