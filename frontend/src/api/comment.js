import axios from "./axios";

const gateway = "board";
const url = "comments";

export function getCommentList(boardId, data, success, fail) {
  axios
    .post(`/${gateway}/${url}/list/${boardId}`, data)
    .then(success)
    .catch(fail);
}

export function createComment(boardId, comment, success, fail) {
  axios
    .post(`/${gateway}/${url}/${boardId}`, comment)
    .then(success)
    .catch(fail);
}

export function updateComment(commentId, comment, success, fail) {
  axios
    .put(`/${gateway}/${url}/${commentId}`, comment)
    .then(success)
    .catch(fail);
}

export function deleteComment(commentId, success, fail) {
  axios.delete(`/${gateway}/${url}/${commentId}`).then(success).catch(fail);
}

export function likeComment(commentId, success, fail) {
  axios.post(`/${gateway}/${url}/like/${commentId}`).then(success).catch(fail);
}

export function unlikeComment(commentId, success, fail) {
  axios
    .delete(`/${gateway}/${url}/likes/${commentId}`)
    .then(success)
    .catch(fail);
}

// export function createReply(parentId, comment, success, fail) {
//   axios
//     .post(`/${gateway}/${url}/${parentId}/replies`, comment)
//     .then(success)
//     .catch(fail);
// }
