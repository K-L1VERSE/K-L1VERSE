import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";

import StartPage from "./pages/SurveyPage/StartPage";
import QuestionPage from "./pages/SurveyPage/QuestionPage";
import ResultPage from "./pages/SurveyPage/ResultPage";

import KaKaoRedirection from "./pages/login_page/KaKaoRedirection";
import NaverRedirection from "./pages/login_page/NaverRedirection";
import GoogleRedirection from "./pages/login_page/GoogleRedirection";

import logo from "./logo.svg";
import "./App.css";

import MatchPage from "./pages/match_page/MatchPage";

import MainPage from "./pages/main_page/MainPage";
import LoginPage from "./pages/login_page/LoginPage";
import MyPage from "./pages/mypage/MyPage";

function App() {
  // const [questionId, setQuestionId] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainPage />} />

          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 로그인 리다이렉션 페이지 */}
          <Route path="/KakaoAuth" element={<KaKaoRedirection />} />
          <Route path="/GoogleAuth" element={<GoogleRedirection />} />
          <Route path="/NaverAuth" element={<NaverRedirection />} />

          {/* 경기 페이지 */}
          <Route path="/match" element={<MatchPage />} />

          {/* 마이 페이지 */}
          <Route path="/mypage" element={<MyPage />} />

          <Route path="/survey" element={<StartPage />} />
          <Route path="/question/:questionNum" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
