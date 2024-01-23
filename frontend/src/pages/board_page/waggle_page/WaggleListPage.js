import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState([]);
  const navigate = useNavigate();

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

  function handleWriteWaggleClick() {
    // "와글 글 작성" 버튼 클릭 시 WaggleRegistPage로 이동
    navigate("/waggleRegist");
  }

  return (
    <div>
      <h1>Waggle 게시판 목록</h1>
      <button onClick={handleWriteWaggleClick}>글 작성</button>
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
