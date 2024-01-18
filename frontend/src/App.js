import { BrowserRouter, Route, Routes } from "react-router-dom";
import KakaoLoginButton from "./components/login/KakaoLoginButton";

import logo from "./logo.svg";
import "./App.css";
import KaKaoRedirection from "./pages/login_page/KaKaoRedirection";
import NaverLoginButton from "./components/login/NaverLoginButton";
import NaverRedirection from "./pages/login_page/NaverRedirection";
import GoogleLoginButton from "./components/login/GoogleLoginButton";
import MyPage from "./pages/mypage/MyPage";

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

        <KakaoLoginButton />
        <NaverLoginButton />
        <GoogleLoginButton />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/KakaoAuth" element={<KaKaoRedirection />} />
          {/* <Route path="/GoogleAuth" element={<GoogleRedirect />} /> */}
          <Route path="/NaverAuth" element={<NaverRedirection />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
