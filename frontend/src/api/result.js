// import axios from "axios";
import axios from "./axios";

// const postmanUrl =
//   " https://73f3a277-da9e-487e-9d67-488152202415.mock.pstmn.io";
// const baseUrl = "http://localhost:8000";

// 답변에 대한 결과값 조회
export function getResult(teamId) {
  console.log("axios result");
  return new Promise((resolve, reject) => {
    axios
      .get(`api/survey/recommend?teamId=${teamId}`)
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
