/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { useNavigate } from "react-router-dom";
import Board from "../../components/main/Board";
import { Category, Title, AllBtn } from "../../styles/main-styles/MainStyle";
import TodayMatch from "../../components/main/TodayMatch";
import Notice from "../../components/main/Notice";
import Hotclip from "../../components/main/Hotclip";
import Nostradamus from "../../components/main/Nostradamus";
import Survey from "../../components/main/Survey";

function MainPage() {
  const navigate = useNavigate();

  function handleAllBtn() {
    navigate("/waggle");
  }

  return (
    <div>
      <Notice />
      <Category>
        <Title>💬 커뮤니티</Title>
        <AllBtn onClick={handleAllBtn}>전체보기</AllBtn>
      </Category>
      <Board />
      <Category>
        <Title>🏁 오늘의 경기</Title>
        <AllBtn>전체보기</AllBtn>
      </Category>
      <TodayMatch />
      <Hotclip />
      <Category>
        <Title>🎯 노스트라다무스 랭킹</Title>
      </Category>
      <Nostradamus />
      <Survey />
    </div>
  );
}

export default MainPage;
