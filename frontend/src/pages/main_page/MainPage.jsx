import React from "react";
import { Board } from "../../styles/main-styles/MainStyle";
import BoardItem from "../../components/main/BoardItem";

function MainPage() {
  return (
    <div>
      {/* 공지사항 컨테이너, 각 컨테이너 밑에 컴포넌트 개발해주세요. */}
      <div>index</div>
      {/* 커뮤니티 컨테이너 */}
      <Board>
        <BoardItem />
      </Board>
      {/* 오늘의 경기 컨테이너 */}
      <div>index</div>
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
