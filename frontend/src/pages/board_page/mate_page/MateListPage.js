import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "../../../api/axios";

function MateListPage() {
  const [mateList, setMateList] = useState([]);
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

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

  const handleWriteMateClick = () => {
    navigate("/mateRegist");
  };

  const handleCalendarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h1>Mate 게시판 목록</h1>
      <button onClick={handleWriteMateClick}>직관 메이트 글 작성</button>
      <button onClick={handleCalendarToggle}>📆</button>
      {isOpen && <Calendar onChange={onChange} value={value} />}
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
