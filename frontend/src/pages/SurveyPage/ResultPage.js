import React, { useState, useEffect } from "react";
import TeamImage from "../SurveyContent/teamImage";
import { ShareBox, Share } from "../../styles/SurveyStyles/ResultCardStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const {
    state: { teamId },
  } = useLocation();

  return (
    <div>
      <h1>Result Page</h1>
      <TeamImage teamId={teamId} />

      {/* <ShareBox>
        <button onClick={shareTwitter}>
          <FontAwesomeIcon icon={faTwitter} size="2x" color="white" />
          <Share>트위터에 공유하기</Share>
        </button>
      </ShareBox>
      <ShareBox>
        <button onClick={shareFacebook}>
          <FontAwesomeIcon icon={faFacebook} size="2x" color="white" />
          <Share>페이스북에 공유하기</Share>
        </button>
      </ShareBox>
      <ShareBox>
        <button onClick={copyUrl}>
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
      </ShareBox> */}
    </div>
  );
}

export default ResultPage;
