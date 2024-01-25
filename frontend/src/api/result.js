/* eslint-disable */
import axios from "./axios";

// 답변에 대한 결과값 조회
export async function submitResult(result) {
  return await axios
    .post("/surveys/recommend", { selectedAnswers: result })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error submitting result:", error);
      throw error; // 오류를 상위 컴포넌트로 전달
    });
}
