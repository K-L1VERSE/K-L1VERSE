import axios from "axios";

const postmanUrl =
  " https://73f3a277-da9e-487e-9d67-488152202415.mock.pstmn.io";
// const baseUrl = "http://localhost:8000";

// 질문 내용 조회
export function getQuestion(questionNum) {
  console.log("axios question");
  return new Promise((resolve, reject) => {
    axios
      .get(`${postmanUrl}/surveys/1/${questionNum}`)
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

// 질문에 대한 선택지 조회
export function getAnswer(questionNum) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${postmanUrl}/surveys/1/answer/${questionNum}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
