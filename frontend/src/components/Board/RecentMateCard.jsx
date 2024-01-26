import React, { useState, useEffect } from "react";
import axios from "axios";

function RecentMateCard() {
  const [recentMates, setRecentMates] = useState([]);

  useEffect(() => {
    // 최근 2개의 waggle 게시물을 가져오는 API 호출
    axios
      .get("/mates/recent/2")
      .then((response) => {
        // API에서 받아온 데이터 중 최근 2개만 추출
        const recentTwoMates = response.data.slice(0, 2);
        setRecentMates(recentTwoMates);
      })
      .catch((error) => {
        console.error("Error fetching recent mates:", error);
      });
  }, []);

  return (
    <div>
      <h2>👋🏻경기 직관할 메이트를 구합니다</h2>
      <ul>
        {recentMates.map((mate) => (
          <li key={mate.id}>
            <p>{mate.title}</p>
            <p>{mate.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentMateCard;
