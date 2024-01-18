import React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/SurveyPage/StartPage";
import QuestionPage from "./pages/SurveyPage/QuestionPage";
import ResultPage from "./pages/SurveyPage/ResultPage";

function App() {
  return (
    <div>
      <title>K-L1verse</title>

      <Routes>
        <Route path="/survey" element={<StartPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
