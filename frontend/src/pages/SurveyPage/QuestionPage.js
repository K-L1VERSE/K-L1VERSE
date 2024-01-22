/* eslint-disable */
import React, { useState, useEffect } from "react";
// import QuizCard from "../../components/Survey/Quizcard";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { Question } from "../../styles/SurveyStyles/QuizCardStyle";

import { getQuestion, getAnswer } from "../../api/question";
import SurveyButton from "../../styles/SurveyStyles/SurveyButton";

function QuestionPage() {
  const params = useParams();
  const questionId = parseInt(params.questionNum);
  const nav = useNavigate();
  const location = useLocation();

  const [question, setQuestion] = useState("question");
  const [answer, setAnswer] = useState([
    { answerId: 1, content: "hello" },
    { answerId: 2, content: "hello" },
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
        setAnswer(data);
        console.log("got answer");
        console.log(answer);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [questionId]);

  function handleClick(answerId) {
    console.log(answerId);

    result[questionId] = answerId;
    console.log("next");
    console.log(result);

    if (questionId === 7) {
      console.log("끝남");
      console.log(result);
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
        )}
      </>
    </Question>
  );
}

export default QuestionPage;
