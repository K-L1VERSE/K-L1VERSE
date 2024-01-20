// TeamImage.js

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // PropTypes 추가

const TeamImage = ({ teamId }) => {
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

  // 팀 이미지의 상태 변수
  const [teamImage, setTeamImage] = useState(null);

  useEffect(() => {
    // teamId가 존재하면 이미지 경로를 가져오고 설정, 그렇지 않으면 무시
    if (teamId !== null && teamId !== undefined) {
      const imageSrc = teamImages[teamId];
      setTeamImage(imageSrc);
    }
  }, [teamId]);

  if (!teamImage) {
    return null; // 이미지가 없을 경우 아무것도 렌더링하지 않음
  }

  return <img src={teamImage} style={{ maxWidth: "100%", height: "auto" }} />;
};

// PropTypes 추가
TeamImage.propTypes = {
  teamId: PropTypes.number, // number 타입으로 변경
};

export default TeamImage;
