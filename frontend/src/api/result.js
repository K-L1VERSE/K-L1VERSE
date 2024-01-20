// import axios from "axios";
import axios from "./axios";

// const postmanUrl =
//   " https://73f3a277-da9e-487e-9d67-488152202415.mock.pstmn.io";
// const baseUrl = "http://localhost:8000";

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
