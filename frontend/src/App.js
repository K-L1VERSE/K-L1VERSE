import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";

import StartPage from "./pages/SurveyPage/StartPage";
import QuestionPage from "./pages/SurveyPage/QuestionPage";
import ResultPage from "./pages/SurveyPage/ResultPage";

import KaKaoRedirection from "./pages/login_page/KaKaoRedirection";
import NaverRedirection from "./pages/login_page/NaverRedirection";
import GoogleRedirection from "./pages/login_page/GoogleRedirection";

import MainPage from "./pages/main_page/MainPage";
import MatchPage from "./pages/match_page/MatchPage";
import LoginPage from "./pages/login_page/LoginPage";
import MyPage from "./pages/my_page/MyPage";
import Navbar from "./pages/nav/Navbar";
import SocketProvider from "./global/SocketProvider";
import LogoutPage from "./pages/logout_page/LogoutPage";
import Notification from "./components/notification/Notification";

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
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/login" element={<LoginPage />} />

            {/* 로그아웃 페이지 */}
            <Route path="/logout" element={<LogoutPage />} />

            {/* 로그인 리다이렉션 페이지 */}
            <Route path="/KakaoAuth" element={<KaKaoRedirection />} />
            <Route path="/GoogleAuth" element={<GoogleRedirection />} />
            <Route path="/NaverAuth" element={<NaverRedirection />} />

            <Route path="/" element={<Navbar />}>
              {/* 메인 페이지 */}
              <Route index element={<MainPage />} />

              {/* 알림 페이지 */}
              <Route path="/notification" element={<Notification />} />

              {/* 설문 페이지 */}
              <Route path="/survey" element={<StartPage />} />
              <Route path="/question/:questionNum" element={<QuestionPage />} />
              <Route path="/result" element={<ResultPage />} />

              {/* 와글 페이지 */}
              <Route path="/waggle" element={<WaggleListPage />} />
              <Route path="/waggle/:boardId" element={<WaggleDetailPage />} />
              <Route path="/waggleRegist" element={<WaggleRegistPage />} />

              {/* 직관 메이트 페이지 */}
              <Route path="/mate" element={<MateListPage />} />
              <Route path="/mate/:boardId" element={<MateDetailPage />} />
              <Route path="/mateRegist" element={<MateRegistPage />} />

              {/* 중고 거래 페이지 */}
              <Route path="/product" element={<ProductListPage />} />
              <Route path="/product/:boardId" element={<ProductDetailPage />} />
              <Route path="/productRegist" element={<ProductRegistPage />} />

              {/* 경기 페이지 */}
              <Route path="/match" element={<MatchPage />} />

              {/* 마이 페이지 */}
              <Route path="/mypage" element={<MyPage />} />

              <Route path="/survey" element={<StartPage />} />
              <Route path="/question/:questionNum" element={<QuestionPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}

export default App;
