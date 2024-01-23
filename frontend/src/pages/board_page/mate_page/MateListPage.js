import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

function MateListPage() {
  const [mateList, setMateList] = useState([]);
  const navigate = useNavigate();

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

  function handlerWriteMateClick() {
    // "직관 메이트 글 작성" 버튼 클릭 시 MateRegistPage로 이동
    navigate("/mateRegist");
  }

  return (
    <div>
      <h1>Mate 게시판 목록</h1>
      <button onClick={handlerWriteMateClick}>직관 메이트 글 작성</button>
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
