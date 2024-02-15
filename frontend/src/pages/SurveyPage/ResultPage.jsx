import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import {
  Modal,
  TopWrap,
  Text,
  BottomWrap,
  UrlBox,
  ShareText,
  Shares,
  ResultTeam,
  Team,
} from "../../styles/SurveyStyles/ResultCardStyle";
import { SurveyTop, ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";
import Wallpaper from "../../assets/wallpaperbetter.png";
import FacebookIcon from "../../assets/icon/facebook-icon(ver2).png";
import TwitterIcon from "../../assets/icon/twitter-icon.png";
import KakaoIcon from "../../assets/icon/kakaotalk.png";
import Goback from "../../assets/icon/go-back-arrow-icon.png";
import LoadingBar from "../../components/Survey/LoadingBar";
import { ReactComponent as Congrats } from "../../assets/congrats.svg";
import { ReactComponent as Refresh } from "../../assets/refresh.svg";

function firework() {
  var duration = 15 * 100;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 0 };
  //  startVelocity: 범위, spread: 방향, ticks: 갯수

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    );
  }, 250);
}

function ResultPage() {
  const teamImages = {
    1: [
      "images/surveyResult/ulsan_mita1.png",
      "images/surveyResult/ulsan_mita2.png",
      "images/surveyResult/ulsan_mita3.png",
    ],
    2: [
      "images/surveyResult/pohang_soidori1.png",
      "images/surveyResult/pohang_soidori2.png",
      "images/surveyResult/pohang_soidori3.png",
    ],
    3: [
      "images/surveyResult/jeju_gamguri1.png",
      "images/surveyResult/jeju_gamguri2.png",
      "images/surveyResult/jeju_gamguri3.png",
    ],
    4: [
      "images/surveyResult/jeonbuk_nighty1.png",
      "images/surveyResult/jeonbuk_nighty2.png",
      "images/surveyResult/jeonbuk_nighty3.png",
    ],
    5: [
      "images/surveyResult/seoul_cid1.png",
      "images/surveyResult/seoul_cid2.png",
      "images/surveyResult/seoul_cid3.png",
    ],
    6: [
      "images/surveyResult/daejeon_citizen1.png",
      "images/surveyResult/daejeon_citizen2.png",
      "images/surveyResult/daejeon_citizen3.png",
    ],
    7: [
      "images/surveyResult/daegu_victorica1.png",
      "images/surveyResult/daegu_victorica2.png",
      "images/surveyResult/daegu_victorica3.png",
    ],
    8: [
      "images/surveyResult/incheon_ut21.png",
      "images/surveyResult/incheon_ut22.png",
      "images/surveyResult/incheon_ut23.png",
    ],
    9: [
      "images/surveyResult/gangwon_gangwoong1.png",
      "images/surveyResult/gangwon_gangwoong2.png",
      "images/surveyResult/gangwon_gangwoong3.png",
    ],
    10: [
      "images/surveyResult/gwangju_mascot1.png",
      "images/surveyResult/gwangju_mascot2.png",
      "images/surveyResult/gwangju_mascot3.png",
    ],
    11: [
      "images/surveyResult/suwon_swoony1.png",
      "images/surveyResult/suwon_swoony2.png",
      "images/surveyResult/suwon_swoony3.png",
    ],
    12: [
      "images/surveyResult/kimcheon_shuwoong21.png",
      "images/surveyResult/kimcheon_shuwoong22.png",
      "images/surveyResult/kimcheon_shuwoong23.png",
    ],
  };

  const teamNames = {
    1: "울산 HD FC",
    2: "포항 스틸러스",
    3: "제주 유나이티드",
    4: "전북 현대 모터스",
    5: "FC 서울",
    6: "대전 하나 시티즌",
    7: "대구 FC",
    8: "인천 유나이티드 FC",
    9: "강원 FC",
    10: "광주 FC",
    11: "수원 FC",
    12: "김천 상무 FC",
  };

  const {
    state: { teamId },
  } = useLocation();
  const copyUrlRef = React.useRef();
  const navigate = useNavigate();
  const [isCopyModalOpen, setIsCopyModalOpen] = React.useState(false);
  const [showResult, setShowResult] = useState(false);
  const randomBackground = Math.floor(Math.random() * 3);
  const selectedTeamImage = teamImages[teamId][randomBackground];

  useEffect(() => {
    const tick = setTimeout(() => {
      setShowResult(true);
      firework();
    }, 3000);
    return () => clearTimeout(tick);
  }, []);

  function copyUrl(e) {
    if (!document.queryCommandSupported("copy")) {
      alert("복사 기능이 지원되지 않는 브라우저입니다.");
    } else {
      copyUrlRef.current.select();
      document.execCommand("copy");
      e.target.focus();
      $(".show").css("display", "flex");
      setIsCopyModalOpen(true);
      const time = setTimeout(() => {
        $(".show").css("display", "none");
        setIsCopyModalOpen(false);
      }, 1000);
      return () => clearTimeout(time);
    }
    return false;
  }

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?via=likeCpp&text=${encodeURIComponent("재미로 보는 나와 비슷한 케이리그 구단은?!")}&url=${encodeURIComponent(window.location.href)}`,
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    );
  };

  const goStart = () => {
    navigate("/survey");
  };

  // **************** kakao 공유 ****************
  const { Kakao } = window;

  // 배포한 자신의 사이트
  const realUrl = "https://k-l1verse.site/survey";
  // 로컬 주소 (localhost 3000 같은거)
  const resultUrl = window.location.href;

  const domainAndPort = process.env.REACT_APP_DOMAIN_AND_PORT;

  const imageUrl =
    "https://k-l1verse.site/" + teamImages[teamId][randomBackground];
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
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "나랑 어울리는 K-리그 구단은?",
        description: teamNames[teamId],
        imageUrl,
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

  return (
    <div>
      {showResult && (
        <div>
          <SurveyTop>
            <ToLeftImg src={ToLeftPng} onClick={goStart} />
            나와 맞는 구단 알아보기
          </SurveyTop>
          <TopWrap>
            <Congrats />
            <Text>{`나와 어울리는\n축구 팀은?`}</Text>
          </TopWrap>
          <div>
            <ResultTeam>
              {/* <img src={selectedTeamImage} alt="teamImage" /> */}
              <Team>
                {/* <div className="team-name">{teamNames[teamId]}</div> */}
                <img
                  src={selectedTeamImage}
                  className="team-image"
                  alt="teamImage"
                />
              </Team>
            </ResultTeam>
          </div>
          {/* <BottomWrap>
            <ShareText>
              <div>콘텐츠 공유하기</div>
              <div>
                <img
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png"
                  alt="Love Letter"
                  width="25"
                  height="25"
                />
              </div>
            </ShareText>
            <UrlBox>
              <input
                type="text"
                ref={copyUrlRef}
                defaultValue={window.location.href}
                readOnly
              />
              <div onClick={copyUrl}>
                URL
                <br />
                복사
              </div>
            </UrlBox>
            <hr></hr>
          </BottomWrap> */}
          <Shares>
            {/* <img src={FacebookIcon} onClick={shareFacebook} alt="facebook" />
              <img src={TwitterIcon} onClick={shareTwitter} alt="twitter" /> */}
            <div onClick={shareKakaoLink}>
              <img src={KakaoIcon} onClick={shareKakaoLink} alt="kakao" />
              <span>공유하기</span>
            </div>
            <div onClick={goStart}>
              {/* <img src={refresh} onClick={goStart} alt="restart" /> */}
              <Refresh />
              <span>다시하기</span>
            </div>
          </Shares>
        </div>
      )}
      {!showResult && <LoadingBar done={100} />}
      {isCopyModalOpen && (
        <Modal>
          <div>링크가 복사되었습니다 😉</div>
        </Modal>
      )}
    </div>
  );
}

export default ResultPage;
