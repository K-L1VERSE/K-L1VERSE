import { BrowserRouter, Route, Routes } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

import MatchPage from "./pages/match_page/MatchPage";

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

          {/* 경기 페이지 */}
          <Route path="/match" element={<MatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
