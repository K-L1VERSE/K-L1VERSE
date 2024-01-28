import React from "react";
import Board from "../../components/main/Board";
import { Category, Title, AllBtn } from "../../styles/main-styles/MainStyle";
import TodayMatch from "../../components/main/TodayMatch";

function MainPage() {
  return (
    <div>
      {/* 공지사항 컨테이너, 각 컨테이너 밑에 컴포넌트 개발해주세요. */}
      <div>index</div>
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
      <div>index</div>
      {/* 노스트라다무스 컨테이너 */}
      <div>index</div>
      {/* 성향설문 버튼 */}
      <div>index</div>
    </div>
  );
}

export default MainPage;
