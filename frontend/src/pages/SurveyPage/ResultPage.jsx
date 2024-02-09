import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import {
  ShareBox,
  Share,
  Modal,
} from "../../styles/SurveyStyles/ResultCardStyle";
import TeamImage from "../../components/Survey/TeamImage";
import TeamName from "../../components/Survey/TeamName";
import { SurveyTop, ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";
import LoadingBar from "../../components/Survey/LoadingBar";
import KakaoPage from "./KakaoPage";

function ResultPage() {
  const {
    state: { teamId },
  } = useLocation();
  const copyUrlRef = React.useRef();
  const navigate = useNavigate();
  const [isCopyModalOpen, setIsCopyModalOpen] = React.useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showKakaoPage, setShowKakaoPage] = useState(false);

  useEffect(() => {
    const tick = setTimeout(() => {
      setShowResult(true);
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

  return (
    <div>
      {showResult && (
        <div>
          <SurveyTop>
            <ToLeftImg src={ToLeftPng} onClick={goStart} />
            나와 맞는 구단 알아보기
          </SurveyTop>
          <br />
          <h1>나랑 어울리는 팀은~?</h1>
          <TeamImage teamId={teamId} />
          <TeamName teamId={teamId} />
          <br />
          <ShareBox>
            <div>친구의 결과도 궁금하다면 ?</div>
          </ShareBox>
          <ShareBox>
            <button type="button" onClick={shareTwitter}>
              <FontAwesomeIcon icon={faTwitter} size="2x" color="white" />
              <Share>트위터에 공유하기</Share>
            </button>
          </ShareBox>
          <ShareBox>
            <button type="button" onClick={shareFacebook}>
              <FontAwesomeIcon icon={faFacebook} size="2x" color="white" />
              <Share>페이스북에 공유하기</Share>
            </button>
          </ShareBox>
          <ShareBox>
            <button type="button" onClick={copyUrl}>
              <FontAwesomeIcon icon={faLink} size="2x" color="white" />
              <Share>링크 복사</Share>
              <form>
                <textarea
                  ref={copyUrlRef}
                  defaultValue={window.location.href}
                  readOnly
                />
              </form>
            </button>
          </ShareBox>
          <ShareBox>
            <button type="button" onClick={handleRestart}>
              다시하기
            </button>
            <KakaoPage />
          </ShareBox>
        </div>
      )}
      {!showResult && <LoadingBar done={100} />}
      {isCopyModalOpen && (
        <Modal>
          <p>링크가 복사되었습니다 😉</p>
        </Modal>
      )}
    </div>
  );
}

export default ResultPage;
