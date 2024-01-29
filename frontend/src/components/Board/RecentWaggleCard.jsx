import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function RecentWaggleCard() {
  const [recentWaggles, setRecentWaggles] = useState([]);

  useEffect(() => {
    axios
      .get("/waggles/recent/2")
      .then((response) => {
        const recentTwoWaggles = response.data;
        setRecentWaggles(recentTwoWaggles);
      })
      .catch(() => {
        // console.error("Error fetching recent waggles:", error);
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
