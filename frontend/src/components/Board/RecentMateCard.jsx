import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function RecentMateCard() {
  const [recentMates, setRecentMates] = useState([]);

  useEffect(() => {
    axios
      .get("/producs/recent/2")
      .then((response) => {
        const recentTwoMates = response.data.slice(0, 2);
        setRecentMates(recentTwoMates);
      })
      .catch((error) => {
        // console.error("Error fetching recent mates:", error);
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
