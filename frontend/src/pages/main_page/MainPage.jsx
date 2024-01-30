import React from "react";
import Notice from "../../components/main/Notice";
import Hotclip from "../../components/main/Hotclip";
import Nostradamus from "../../components/main/Nostradamus";
import Survey from "../../components/main/Survey";

function MainPage() {
  return (
    <div>
      {/* 공지사항 컨테이너, 각 컨테이너 밑에 컴포넌트 개발해주세요. */}
      <Notice />
      {/* 커뮤니티 컨테이너 */}
      index
      {/* 오늘의 경기 컨테이너 */}
      index
      {/* 핫클립 컨테이너 */}
      <Hotclip />
      {/* 노스트라다무스 컨테이너 */}
      <Nostradamus />
      {/* 성향설문 버튼 */}
      <Survey />
    </div>
  );
}

export default MainPage;
