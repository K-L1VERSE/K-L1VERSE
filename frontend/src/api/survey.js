import axios from "./axios";

const url = "surveys";

// surveyId 보내기
export function getSurvey(surveyId) {
  console.log("axios survey");
  return axios
    .get(`/${url}/${surveyId}`)
    .then((response) => {
      console.log("got surveyId");
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

// 질문 내용 조회
export function getQuestion(questionNum) {
  console.log("axios question");
  return axios
    .get(`/${url}/questions?questionId=${questionNum}`)
    .then(({ data }) => {
      console.log("got response");
      console.log(data);
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

// 답변에 대한 결과값 조회
export function submitResult(result) {
  return axios
    .post(`/${url}/recommend`, { selectedAnswers: result })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error submitting result:", error);
      throw error;
    });
}
