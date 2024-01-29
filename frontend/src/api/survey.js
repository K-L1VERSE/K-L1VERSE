import axios from "./axios";

const url = "surveys";

// surveyId 보내기
export function getSurvey(surveyId) {
  return axios.get(`/${url}/${surveyId}`).then((response) => {
    return response.data;
  });
}

// 질문 내용 조회
export function getQuestion(questionNum) {
  return axios
    .get(`/${url}/questions?questionId=${questionNum}`)
    .then(({ data }) => {
      return data;
    });
}

// 답변에 대한 결과값 조회
export function submitResult(result) {
  return axios
    .post(`/${url}/recommend`, { selectedAnswers: result })
    .then((response) => response.data);
}
