/* eslint-disable */
import React, { useState, useEffect } from "react";
// import QuizCard from "../../components/Survey/Quizcard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  NumberContainer,
  Number,
  Question,
  SingleQuestion,
  ChoiceButton,
  PreviousButton,
} from "../../styles/SurveyStyles/QuizCardStyle";

import { getQuestion, submitResult } from "../../api/survey";
import { SurveyTop } from "../../styles/SurveyStyles/SurveyTop";
import { ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";

function QuestionPage() {
  const params = useParams();
  const questionId = parseInt(params.questionNum);

  const nav = useNavigate();
  const location = useLocation();

  const [question, setQuestion] = useState("");
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

  const goStart = () => {
    nav("/survey");
  };
  return (
    <Question>
      <SurveyTop>
        <ToLeftImg src={ToLeftPng} onClick={goStart} />
        나와 맞는 구단 알아보기
      </SurveyTop>
      <NumberContainer>
        {questionId == 1 && <div></div>}
        {questionId >= 2 && (
          <PreviousButton onClick={() => handleBeforeClick()}>←</PreviousButton>
        )}
        <Number>{questionId} / 7</Number>
      </NumberContainer>
      <SingleQuestion>{question}</SingleQuestion>
      {answers &&
        answers.map((item) => (
          <ChoiceButton
            key={item.answerId}
            onClick={() => handleClick(item.answerId)}
          >
            {item.content}
          </ChoiceButton>
        ))}
    </Question>
  );
}

export default QuestionPage;
