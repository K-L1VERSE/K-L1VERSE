import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import RecentWaggleCard from "../../../components/Board/RecentWaggleCard";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState([]);
  const navigate = useNavigate();

  /* waggle 전체 글 가져오기 */
  useEffect(() => {
    const getWaggleList = () => {
      axios
        .get(`/waggle`)
        .then(({ data }) => {
          setWaggleList(data);
        })
        .catch((err) => {
          console.log("Waggle 게시판 목록을 불러오는 중 에러 발생:", err);
        });
    };

    getWaggleList();
  }, []);

  // "와글 글 작성" 버튼 클릭 시 WaggleRegistPage로 이동
  function handleWriteWaggleClick() {
    navigate("/waggleRegist");
  }

  return (
    <div>
      <BoardTopNavBar />
      <RecentWaggleCard />
      <div>
        <h3>와글와글 떠들어주세요</h3>
        <button onClick={handleWriteWaggleClick}>🖋글쓰기</button>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>제목</th>
            <th>글 내용</th>
          </tr>
        </thead>
        <tbody>
          {waggleList.map((waggle) => (
            <tr key={waggle.board.boardId}>
              {/* 클릭 시 상세 페이지로 이동하도록 Link 사용 */}
              <td>
                <Link to={`/waggle/${waggle.board.boardId}`}>
                  {waggle.board.title}
                </Link>
              </td>
              <td>{waggle.board.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WaggleListPage;
