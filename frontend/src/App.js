import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import StartPage from "./pages/SurveyPage/StartPage";
import QuestionPage from "./pages/SurveyPage/QuestionPage";
import ResultPage from "./pages/SurveyPage/ResultPage";

import KaKaoRedirection from "./pages/login_page/KaKaoRedirection";
import NaverRedirection from "./pages/login_page/NaverRedirection";
import GoogleRedirection from "./pages/login_page/GoogleRedirection";

import logo from "./logo.svg";
import "./App.css";

import LoginPage from "./pages/login_page/LoginPage";
import MyPage from "./pages/my_page/MyPage";

function App() {
  // const [questionId, setQuestionId] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          {/* <Route path="/" element={<index />} /> */}

          {/* 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 로그인 리다이렉션 페이지 */}
          <Route path="/KakaoAuth" element={<KaKaoRedirection />} />
          <Route path="/GoogleAuth" element={<GoogleRedirection />} />
          <Route path="/NaverAuth" element={<NaverRedirection />} />

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
