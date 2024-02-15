import React, { useEffect } from "react";

const { Kakao } = window;

const teamId = 1;
const teamImages = {
  1: "/images/surveyResult/ulsan_mita.jpg",
  2: "/images/surveyResult/pohang_soidori.png",
  3: "/images/surveyResult/jeju_gamguri.png",
  4: "/images/surveyResult/jeonbuk_nighty.png",
  5: "/images/surveyResult/seoul_cid.png",
  6: "/images/surveyResult/daejeon_citizen.webp",
  7: "/images/surveyResult/daegu_victorica.png",
  8: "/images/surveyResult/incheon_ut2.png",
  9: "/images/surveyResult/gangwon_gangwoong.png",
  10: "/images/surveyResult/gwangju_mascot.png",
  11: "/images/surveyResult/suwon_swoony.jpg",
  12: "/images/surveyResult/kimcheon_shuwoong2.png",
};

const KakaoPage = () => {
  const realUrl = "http://i10a409.p.ssafy.io/survey";
  const imageUrl = "https://i10a409.p.ssafy.io" + teamImages[teamId];

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init("6929be9a78433534e7fc811e86f9795a");
  }, []);

  const shareKakaoLink = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "나랑 어울리는 K-리그 구단은?",
        description: "울산 현대",
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      buttons: [
        {
          title: "나도 궁금해!",
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
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
