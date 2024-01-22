import axios from "axios";
// import axios from "./axios";

// const postmanUrl =
//   " https://73f3a277-da9e-487e-9d67-488152202415.mock.pstmn.io";
const baseUrl = "http://localhost:8000";

// surveyId 보내기
export function getSurvey(surveyId) {
  console.log("axios survey");
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/surveys/${surveyId}`)
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
