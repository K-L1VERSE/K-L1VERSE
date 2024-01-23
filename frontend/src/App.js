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
import MyPage from "./pages/mypage/MyPage";

import WaggleListPage from "./pages/board_page/waggle_page/WaggleListPage";
import WaggleDetailPage from "./pages/board_page/waggle_page/WaggleDetailPage";
import WaggleRegistPage from "./pages/board_page/waggle_page/WaggleRegistPage";

import MateListPage from "./pages/board_page/mate_page/MateListPage";
import MateDetailPage from "./pages/board_page/mate_page/MateDetailPage";
import MateRegistPage from "./pages/board_page/mate_page/MateRegistPage";

import ProductListPage from "./pages/board_page/product_page/ProductListPage";
import ProductDetailPage from "./pages/board_page/product_page/ProductDetailPage";
import ProductRegistPage from "./pages/board_page/product_page/ProductRegistPage";

function App() {
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

          {/* 설문 페이지 */}
          <Route path="/survey" element={<StartPage />} />
          <Route path="/question/:questionNum" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />

          {/* 와글 페이지 */}
          <Route path="/waggle" element={<WaggleListPage />} />
          <Route path="/waggle/:waggleId" element={<WaggleDetailPage />} />
          <Route path="/waggleRegist" element={<WaggleRegistPage />} />

          {/* 직관 메이트 페이지 */}
          <Route path="/mate" element={<MateListPage />} />
          <Route path="/mate/:mateId" element={<MateDetailPage />} />
          <Route path="/mateRegist" element={<MateRegistPage />} />

          {/* 중고 거래 페이지 */}
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/productRegist" element={<ProductRegistPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
