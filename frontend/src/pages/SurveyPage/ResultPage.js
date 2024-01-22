/* eslint-disable */
import React from "react";
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
import TeamImage from "../../components/Survey/teamImage";

function ResultPage() {
  const {
    state: { teamId },
  } = useLocation();
  const copyUrlRef = React.useRef();
  const navigate = useNavigate();
  const [isCopyModalOpen, setIsCopyModalOpen] = React.useState(false);

  const copyUrl = (e) => {
    if (!document.queryCommandSupported("copy")) {
      alert("복사 기능이 지원되지 않는 브라우저입니다.");
    } else {
      copyUrlRef.current.select();
      document.execCommand("copy");
      e.target.focus();
      // 링크 복사 함수
      $(".show").css("display", "flex");
      setIsCopyModalOpen(true); // 모달 표시
      const time = setTimeout(() => {
        $(".show").css("display", "none");
        setIsCopyModalOpen(false); // 모달 숨김
      }, 1000);
      return () => clearTimeout(time);
    }
  };

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

  return (
    <div>
      <h1>Result Page</h1>
      <TeamImage teamId={teamId} />

      <ShareBox>
        <div>친구의 결과도 궁금하다면!</div>
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
      </ShareBox>

      {/* 복사 완료 모달 */}
      {isCopyModalOpen && (
        <Modal>
          <p>링크가 복사되었습니다 😉</p>
        </Modal>
      )}
    </div>
  );
}

export default ResultPage;
