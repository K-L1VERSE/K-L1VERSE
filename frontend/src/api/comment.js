import axios from "./axios";

const gateway = "board";
const url = "comments";

export function getCommentList(boardId, success, fail) {
  axios.get(`/${gateway}/${url}/list/${boardId}`).then(success).catch(fail);
}

export function createComment(boardId, comment, success, fail) {
  axios
    .post(`/${gateway}/${url}/${boardId}`, comment)
    .then(success)
    .catch(fail);
}

export function updateComment(comment, commentId, success, fail) {
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

export function createReply(parentId, comment, success, fail) {
  axios
    .post(`/${gateway}/${url}/${parentId}/replies`, comment)
    .then(success)
    .catch(fail);
}
