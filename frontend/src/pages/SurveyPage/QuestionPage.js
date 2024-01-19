/* eslint-disable */
import React, { useState, useEffect } from "react";
// import QuizCard from "../../components/Survey/Quizcard";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { Question } from "../../styles/SurveyStyles/QuizCardStyle";

import { getQuestion, getAnswer } from "../../api/question";
import {
  ChoiceButton,
  PreviousButton,
} from "../../styles/SurveyStyles/SurveyButton";

function QuestionPage() {
  const params = useParams();
  const questionId = parseInt(params.questionNum);
  console.log("!!!!" + questionId);

  const nav = useNavigate();
  const location = useLocation();

  const [question, setQuestion] = useState("question");
  const [answers, setAnswers] = useState([
    // { answerId: 1, content: "hello" },
    // { answerId: 2, content: "hello" },
  ]);

  let result = location.state?.result || [];

  // [{answerId:1, content:"hello"}, {answerId:2, content:"hello"}]

  useEffect(() => {
    console.log(`Started questionId ${questionId}`); // 그냥 출력문
    console.log(result);

    // 질문 내용 가져오기
    getQuestion(questionId)
      .then((data) => {
        setQuestion(data.content);
        console.log("got question");
        console.log(data.content);
      })
      .catch((e) => {
        console.log(e);
      });

    // 선택지 내용 가져오기
    getAnswer(questionId)
      .then((data) => {
        setAnswers(data.answers);
        console.log("got answer");
        console.log("data", data.answers);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [questionId]);

  // function handleClick(answerId) {
  //   console.log(answerId);

  //   result[questionId] = answerId;
  //   console.log("next");
  //   console.log(result);

  //   if (questionId === 7) {
  //     console.log("끝남");
  //     console.log(result);

  //     // 프론트엔드에서 백엔드로 result 전송
  //     fetch("https://your-backend-api.com/submitResult", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ result }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Success:", data);
  //         // 추가적인 작업이 필요하다면 여기에서 처리
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });

  //     nav("/result", { state: { result } });
  //   } else {
  //     nav(`/question/${questionId + 1}`, { state: { result } });
  //   }
  // }
  function handleClick(answerId) {
    console.log(answerId);

    result[questionId] = answerId;
    console.log("next");
    console.log(result);

    if (questionId === 7) {
      console.log("끝남");
      console.log(result);

      // 프론트엔드에서 백엔드로 result 전송
      fetch("https://your-backend-api.com/submitResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ result }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          // 추가적인 작업이 필요하다면 여기에서 처리
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      nav("/result", { state: { result } });
    } else {
      nav(`/question/${questionId + 1}`, { state: { result } });
    }
  }

  function handleBeforeClick() {
    result[questionId - 1] = 0;
    nav(`/question/${questionId - 1}`, { state: { result } });
  }

  return (
    <Question>
      <>
        <div>{questionId}/7</div>
        <br />
        <div>{question}</div>
        <br />
        {answers &&
          answers.map((item) => (
            <ChoiceButton
              key={item.answerId}
              onClick={() => handleClick(item.answerId)}
            >
              {item.context}
            </ChoiceButton>
          ))}
        {questionId >= 2 && (
          <PreviousButton onClick={() => handleBeforeClick()}>
            이전 문제로 돌아가기
          </PreviousButton>
        )}
      </>
    </Question>
  );
}

export default QuestionPage;
