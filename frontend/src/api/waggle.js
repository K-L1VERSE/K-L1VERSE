import axios from "./axios";
import { useRecoilState } from "recoil";
import { UserState } from "../global/UserState";

const gateway = "board";
const url = "waggles";

export function getWaggleList(page, size, success, fail) {
  axios
    .get(
      `/${gateway}/${url}/pages?page=${page}&size=${size}&sort=board.createAt,desc`,
    )
    .then(success)
    .catch(fail);
}

export function getWaggleDetail(boardId) {
  axios.get(`/${gateway}/${url}/${boardId}`).then((response) => response.data);
}

export function createWaggle(board) {
  const [userState] = useRecoilState(UserState); // Destructure the result of useRecoilState
  const { userId, accessToken } = userState;

  const requestData = {
    board: {
      boardType: "WAGGLE",
      title: board.title,
      content: board.content,
      userId: userId,
    },
  };

  return axios
    .post(`/${gateway}/${url}`, requestData)
    .then((response) => response.data);
}

export function updateWaggle(board) {
  axios
    .put(`/${gateway}/${url}/${board.boardId}`, board)
    .then((response) => response.data);
}

export function getLatestWaggle(success, fail) {
  axios.get(`/${gateway}/${url}/recent/2`).then(success).catch(fail);
}
