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
import TeamImage from "../../components/Survey/TeamImage";
import TeamName from "../../components/Survey/TeamName";
import { SurveyTop, ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";
import Wallpaper from "../../assets/wallpaperbetter.png";
import Facebook from "../../assets/icon/facebook-icon(ver2).png";
import Twitter from "../../assets/icon/twitter-icon.png";
import Kakao from "../../assets/icon/kakaotalk-icon.png";
import Goback from "../../assets/icon/go-back-arrow-icon.png";
import LoadingBar from "../../components/Survey/LoadingBar";
import { ReactComponent as Congrats } from "../../assets/congrats.svg";

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
  const {
    state: { teamId },
  } = useLocation();
  const copyUrlRef = React.useRef();
  const navigate = useNavigate();
  const [isCopyModalOpen, setIsCopyModalOpen] = React.useState(false);
  const [showResult, setShowResult] = useState(false);

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

  const handleRestart = () => {
    navigate("/survey");
  };

  const goStart = () => {
    navigate("/survey");
  };

  const goKakao = () => {
    navigate("/kakao");
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
          <BottomWrap>
            <ResultTeam>
              <img src={Wallpaper} alt="" />
              <Team>
                <TeamName teamId={teamId} />
                <TeamImage teamId={teamId} />
              </Team>
            </ResultTeam>
            <ShareText>콘텐츠 공유하기</ShareText>
            <UrlBox>
              <input
                type="text"
                ref={copyUrlRef}
                defaultValue={window.location.href}
                readOnly
              />
              <div onClick={copyUrl}>URL 복사</div>
            </UrlBox>
            <Shares>
              <img src={Facebook} onClick={shareFacebook} alt="facebook" />
              <img src={Twitter} onClick={shareTwitter} alt="twitter" />
              <img src={Kakao} onClick={goKakao} alt="kakao" />
              <span>
                <img src={Goback} onClick={handleRestart} alt="" />
              </span>
            </Shares>
          </BottomWrap>
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
