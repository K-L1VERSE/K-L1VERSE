import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState({
    boardId: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    userId: "",
    nickname: "",
  });

  /* waggle 전체 글 가져오기 */
  useEffect(() => {
    const getWaggleList = () => {
      axios
        .get("/waggles/list")
        .then(({ data }) => {
          setWaggleList(data);
        })
        .catch((err) => {
          console.log("Waggle 게시판 목록을 불러오는 중 에러 발생:", err);
        });
    };

    getWaggleList();
  }, []);

  return (
    <div>
      <h1>Waggle 게시판 목록</h1>
      <ul>
        {waggleList.map((waggle) => (
          <li key={waggle.waggleId}>
            <strong>{waggle.title}</strong>: {waggle.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WaggleListPage;
