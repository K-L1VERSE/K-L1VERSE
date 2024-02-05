import React, { useEffect } from "react";

const { Kakao } = window;

const KakaoPage = () => {
  // 배포한 자신의 사이트
  const realUrl = "http://localhost:3000/";
  // 로컬 주소 (localhost 3000 같은거)
  const resultUrl = window.location.href;

  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    Kakao.init("6929be9a78433534e7fc811e86f9795a");
    // 잘 적용되면 true 를 뱉는다.
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakaoLink = () => {
    Kakao.Share.sendCustom({
      templateId: 104000,
    });
  };

  const shareKakao = () => {
    shareKakaoLink();
  };

  return (
    <div>
      <button type="button" className="grey-btn" onClick={shareKakao}>
        카카오톡 공유하기
      </button>
    </div>
  );
};

export default KakaoPage;
