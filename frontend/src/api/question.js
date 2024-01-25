import axios from "./axios";

// 질문 내용 조회
export function getQuestion(questionNum) {
  console.log("axios question");
  return new Promise((resolve, reject) => {
    axios
      .get(`surveys/questions?questionId=${questionNum}`)
      .then(({ data }) => {
        console.log("got response");
        console.log(data);
        resolve(data);
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
      .get(`surveys/questions?questionId=${questionNum}`)
      .then((response) => {
        console.log("got answers");
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
