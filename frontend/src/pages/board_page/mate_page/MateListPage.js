import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";

function MateListPage() {
  const [mateList, setMateList] = useState({
    boardId: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    userId: "",
    nickname: "",
  });

  /* mate 전체 글 가져오기 */
  useEffect(() => {
    const getMateList = () => {
      axios
        .get("/mates/list")
        .then(({ data }) => {
          setMateList(data);
        })
        .catch((err) => {
          console.log("Mate 게시판 목록을 불러오는 중 에러 발생:", err);
        });
    };

    getMateList();
  }, []);

  return (
    <div>
      <h1>Mate 게시판 목록</h1>
      <ul>
        {mateList.map((mate) => (
          <li key={mate.mateId}>
            <strong>{mate.title}</strong>: {mate.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MateListPage;
