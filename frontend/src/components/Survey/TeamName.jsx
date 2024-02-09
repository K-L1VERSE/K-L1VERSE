/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TeamName = ({ teamId }) => {
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

  // 팀 이름 상태 변수
  const [teamName, setTeamName] = useState(null);

  useEffect(() => {
    // teamId가 존재하면 이미지 경로를 가져오고 설정, 그렇지 않으면 무시
    if (teamId !== null && teamId !== undefined) {
      const name = teamNames[teamId];
      setTeamName(name);
    }
  }, [teamId]);

  if (!teamName) {
    return null; // 팀 이름이 없을 경우 아무것도 렌더링하지 않음
  }

  return <div>{teamName}</div>;
};

// PropTypes 수정
TeamName.propTypes = {
  teamId: PropTypes.number,
};

export default TeamName;
