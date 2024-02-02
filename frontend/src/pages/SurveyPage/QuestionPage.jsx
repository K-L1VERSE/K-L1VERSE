import React, { useState, useEffect } from "react";
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
import { SurveyTop, ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";

function QuestionPage() {
  const params = useParams();
  const questionId = parseInt(params.questionNum, 10);

  const nav = useNavigate();
  const location = useLocation();

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);

  const result = location.state?.result || [];

  useEffect(() => {
    getQuestion(questionId)
      .then((data) => {
        setQuestion(data.content);
        setAnswers(data.answers);
      })
      .catch(() => {});
  }, [questionId]);

  function handleClick(answerId) {
    result[questionId - 1] = answerId;
    if (questionId === 7) {
      submitResult(result)
        .then((teamId) => {
          nav("/result", { state: { teamId } });
        })
        .catch(() => {});
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
        {questionId === 1 && <div />}
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
