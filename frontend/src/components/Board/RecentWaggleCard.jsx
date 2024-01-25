import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function RecentWaggleCard() {
  const [recentWaggles, setRecentWaggles] = useState([]);

  useEffect(() => {
    // 최근 2개의 waggle 게시물을 가져오는 API 호출
    axios
      .get("/waggle/recent/2")
      .then((response) => {
        // API에서 받아온 데이터 중 최근 2개만 추출
        const recentTwoWaggles = response.data;
        setRecentWaggles(recentTwoWaggles);
      })
      .catch((error) => {
        console.error("Error fetching recent waggles:", error);
      });
  }, []);

  return (
    <div>
      <h2>⚽축구 경기 직관 후기를 알려주세요</h2>
      <ul>
        {recentWaggles.map((waggle) => (
          <li key={waggle.waggleId}>
            <p>{waggle.board.title}</p>
            <p>{waggle.board.createAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentWaggleCard;
