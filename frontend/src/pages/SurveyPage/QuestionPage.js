/* eslint-disable */
import React, { useState, useEffect } from "react";
// import QuizCard from "../../components/Survey/Quizcard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { submitResult } from "../../api/result";
import { Question } from "../../styles/SurveyStyles/QuizCardStyle";

import { getQuestion, getAnswer } from "../../api/question";
import {
  ChoiceButton,
  PreviousButton,
} from "../../styles/SurveyStyles/SurveyButton";
=======

import { Question } from "../../styles/SurveyStyles/QuizCardStyle";

import { getQuestion, getAnswer } from "../../api/question";
import SurveyButton from "../../styles/SurveyStyles/SurveyButton";
>>>>>>> feature-api/S10P12A409-3

function QuestionPage() {
  const params = useParams();
  const questionId = parseInt(params.questionNum);
<<<<<<< HEAD
  console.log("!!!!" + questionId);

=======
>>>>>>> feature-api/S10P12A409-3
  const nav = useNavigate();
  const location = useLocation();

  const [question, setQuestion] = useState("question");
<<<<<<< HEAD
  const [answers, setAnswers] = useState([
    // { answerId: 1, content: "hello" },
    // { answerId: 2, content: "hello" },
=======
  const [answer, setAnswer] = useState([
    { answerId: 1, content: "hello" },
    { answerId: 2, content: "hello" },
>>>>>>> feature-api/S10P12A409-3
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
<<<<<<< HEAD
        setAnswers(data.answers);
        console.log("got answer");
        console.log("data", data.answers);
=======
        setAnswer(data);
        console.log("got answer");
        console.log(answer);
>>>>>>> feature-api/S10P12A409-3
      })
      .catch((e) => {
        console.log(e);
      });
  }, [questionId]);

  function handleClick(answerId) {
<<<<<<< HEAD
    result[questionId - 1] = answerId;
    if (questionId === 7) {
      // 프론트엔드에서 백엔드로 result 전송
      // fetch("http://localhost:8080/api/survey/recommend", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ result }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log("Success:", data);
      //     // 추가적인 작업이 필요하다면 여기에서 처리
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });

      // 서버에 결과 값을 전송하고 계산된 팀 ID를 받아옴
      console.log("result: ", result);
      submitResult(result)
        .then((teamId) => {
          nav("/result", { state: { teamId } });
        })
        .catch((error) => {
          console.error("Error getting calculated team ID:", error);
        });
=======
    console.log(answerId);

    result[questionId] = answerId;
    console.log("next");
    console.log(result);

    if (questionId === 7) {
      console.log("끝남");
      console.log(result);
>>>>>>> feature-api/S10P12A409-3
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
<<<<<<< HEAD
        {answers &&
          answers.map((item) => (
            <ChoiceButton
              key={item.answerId}
              onClick={() => handleClick(item.answerId)}
            >
              {item.context}
            </ChoiceButton>
          ))}
        <></>
        {questionId >= 2 && (
          <PreviousButton onClick={() => handleBeforeClick()}>
            이전 문제로 돌아가기
          </PreviousButton>
=======
        {answer &&
          answer.map((item) => (
            <SurveyButton
              key={item.answerId}
              onClick={() => handleClick(item.answerId)}
            >
              {item.content}
            </SurveyButton>
          ))}
        {questionId >= 2 && (
          <SurveyButton onClick={() => handleBeforeClick()}>
            이전 문제로 돌아가기
          </SurveyButton>
>>>>>>> feature-api/S10P12A409-3
        )}
      </>
    </Question>
  );
}

export default QuestionPage;
