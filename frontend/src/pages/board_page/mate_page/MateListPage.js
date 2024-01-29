import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";

function MateListPage() {
  const [mateList, setMateList] = useState([]);
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getMateList = () => {
      axios
        .get(`/mates`)
        .then(({ data }) => {
          setMateList(data);
        })
        .catch((err) => {
          // console.log("Mate 게시판 목록을 불러오는 중 에러 발생:", err);
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
      <BoardTopNavBar />
      <h1>Mate 게시판 목록</h1>
      <button onClick={handleWriteMateClick}>직관 메이트 글 작성</button>
      <button onClick={handleCalendarToggle}>📆</button>
      {isOpen && <Calendar onChange={onChange} value={value} />}
      <table border="1">
        <thead>
          <tr>
            <th>제목</th>
            <th>글 내용</th>
          </tr>
        </thead>
        <tbody>
          {mateList.map((mate) => (
            <tr key={mate.board.boardId}>
              <td>
                <Link to={`/mates/${mate.board.boardId}`}>
                  {mate.board.title}
                </Link>
              </td>
              <td>{mate.board.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MateListPage;
