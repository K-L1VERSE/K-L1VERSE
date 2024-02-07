import axios from "./axios";

const gateway = "board";
const url = "products";

export function getProductList(page, size, success, fail) {
  axios
    .get(
      `/${gateway}/${url}/pages?page=${page}&size=${size}&sort=board.createAt,desc`,
    )
    .then(success)
    .catch(fail);
}

export function getProductDetail(boardId) {
  axios.get(`/${gateway}/${url}/${boardId}`).then((response) => response.data);
}

export function createProduct(board, success, fail) {
  axios.post(`/${gateway}/${url}`, board).then(success).catch(fail);
}

export function updateProduct(boardId, board, success, fail) {
  axios.put(`/${gateway}/${url}/${boardId}`, board).then(success).catch(fail);
}

export function deleteProduct(boardId, success, fail) {
  axios.delete(`/${gateway}/${url}/${boardId}`).then(success).catch(fail);
}

export function getLatestProduct(success, fail) {
  axios.get(`/${gateway}/${url}/recent/2`).then(success).catch(fail);
}
