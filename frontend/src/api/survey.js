import axios from "./axios";

const url = "survey/surveys";

export function getQuestion(questionNum) {
  return axios
    .get(`/${url}/questions?questionId=${questionNum}`)
    .then(({ data }) => {
      return data;
    });
}

export function submitResult(result) {
  return axios
    .post(`/${url}/recommend`, { selectedAnswers: result })
    .then((response) => response.data);
}
