import axios from "./axios";

const url = "mates";

// boardId 보내기
export function getBoard(boardId) {
  return new Promise((resolve, reject) => {
    // 이건 다른 페이지에서 가져다 쓸 때 chaining 하려고 promise로 반환해주는거
    axios // 그래서 바로 쓸꺼면 여기부터
      .get(`/${url}/${boardId}`)
      .then((response) => {
        console.log("got response");
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      }); // 여기까지만 다른데서 복붙해서 쓰면 됨
  });
}

export function createBoard(board) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/${url}`, board)
      .then((response) => {
        console.log("got response");
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateBoard(board) {
  return new Promise((resolve, reject) => {
    axios
      .put(`/${url}/${board.boardId}`, board)
      .then((response) => {
        console.log("got response");
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getLatestMate(success, fail) {
  axios.get(`/${url}/recent/2`).then(success).catch(fail);
}
