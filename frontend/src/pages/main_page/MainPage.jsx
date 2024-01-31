import React from "react";
import Board from "../../components/main/Board";
import { Category, Title, AllBtn } from "../../styles/main-styles/MainStyle";
import TodayMatch from "../../components/main/TodayMatch";
import Notice from "../../components/main/Notice";
import Hotclip from "../../components/main/Hotclip";
import Nostradamus from "../../components/main/Nostradamus";
import Survey from "../../components/main/Survey";

function MainPage() {
  return (
    <div>
      <Notice />
      {/* 커뮤니티 컨테이너 */}
      <Category>
        <Title>💬 커뮤니티</Title>
        <AllBtn>전체보기</AllBtn>
      </Category>
      <Board />
      {/* 오늘의 경기 컨테이너 */}
      <Category>
        <Title>🏁 오늘의 경기</Title>
        <AllBtn>전체보기</AllBtn>
      </Category>
      <TodayMatch />
      {/* 핫클립 컨테이너 */}
      <Hotclip />
      {/* 노스트라다무스 컨테이너 */}
      <Category>
        <Title>🎯 노스트라다무스 랭킹</Title>
      </Category>
      <Nostradamus />
      {/* 성향설문 버튼 */}
      <Survey />
    </div>
  );
}

export default MainPage;
