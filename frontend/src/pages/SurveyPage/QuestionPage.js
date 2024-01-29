/* eslint-disable */
import React, { useState, useEffect } from "react";
// import QuizCard from "../../components/Survey/Quizcard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Question } from "../../styles/SurveyStyles/QuizCardStyle";

import { getQuestion, submitResult } from "../../api/survey";
import {
  ChoiceButton,
  PreviousButton,
} from "../../styles/SurveyStyles/SurveyButton";

function QuestionPage() {
  const params = useParams();
  const questionId = parseInt(params.questionNum);

  const nav = useNavigate();
  const location = useLocation();

  const [question, setQuestion] = useState("question");
  const [answers, setAnswers] = useState([]);

  let result = location.state?.result || [];

  useEffect(() => {
    // 질문 내용 가져오기
    getQuestion(questionId)
      .then((data) => {
        setQuestion(data.content);
        setAnswers(data.answers);
      })
      .catch((e) => {});

    // 선택지 내용 가져오기
  }, [questionId]);

  function handleClick(answerId) {
    result[questionId - 1] = answerId;
    if (questionId === 7) {
      console.log("result: ", result);
      submitResult(result)
        .then((teamId) => {
          nav("/result", { state: { teamId } });
        })
        .catch((error) => {});
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
              {item.content}
            </ChoiceButton>
          ))}
        <></>
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
