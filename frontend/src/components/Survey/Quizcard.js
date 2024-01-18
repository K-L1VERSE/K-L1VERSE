import React from "react";

function Quizcard() {
  return <div>Quizcard</div>;
}

export default Quizcard;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Button from "../../styles/SurveyStyles/SurveyButton";
// import { Question } from "../../styles/SurveyStyles/QuizCardStyle";

// function QuizCard({ match }) {
//   const [curQuiz, setQuiz] = useState({});
//   const [id, setId] = useState(0);
//   const { id: questionId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/quiz");
//         const data = await response.json();
//         const num = parseInt(questionId, 10); // radix 추가
//         setQuiz(data[num - 1]);
//         setId(num + 1);
//       } catch (error) {
//         console.error("Error fetching quiz data:", error);
//       }
//     };

//     fetchQuizData();
//   }, [questionId]);

//   const getScore = (arr) => {
//     // const scoreNum = 5;
//     // arr.map((name) => {
//     //   // score 업데이트 로직 추가
//     // });

//     navigate(`/question/${id}`);
//   };

//   return (
//     <Question>
//       <>
//         <div>{questionId}/6</div>
//         <br />
//         <div>{curQuiz.question}</div>
//         <br />
//         {curQuiz.answer &&
//           curQuiz.answer.map((item) => (
//             <Button key={item.text} onClick={() => getScore(item.name)}>
//               {item.text}
//             </Button>
//           ))}
//       </>
//     </Question>
//   );
// }

// export default QuizCard;
