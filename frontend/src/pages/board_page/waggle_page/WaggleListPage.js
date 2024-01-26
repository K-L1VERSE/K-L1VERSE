import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import RecentWaggleCard from "../../../components/Board/RecentWaggleCard";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* waggle 전체 글 가져오기 */
  const fetchWaggleList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/waggles/pages?page=${page}&size=30&sort=board.createAt,desc`,
      );
      const newWaggles = response.data.content;

      if (newWaggles.length === 0) {
        // 새로 불러온 데이터가 없으면 더 이상 불러올 데이터가 없다고 설정
        setHasMore(false);
      } else {
        setWaggleList((prevWaggles) => [...prevWaggles, ...newWaggles]);
      }
    } catch (error) {
      console.log("와글 게시판 목록을 불러오는 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (hasMore) {
      // hasMore가 true일 때만 추가 데이터를 불러오도록 설정
      fetchWaggleList();
    }
  }, [hasMore, fetchWaggleList]);

  const handleWriteWaggleClick = () => {
    navigate("/waggleRegist");
  };

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const distanceFromBottom = documentHeight - scrollTop - windowHeight;

    if (distanceFromBottom < 200 && !loading && hasMore) {
      // 스크롤이 아래에 도달하면 다음 페이지의 데이터를 불러옴
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
          {waggleList.map((waggle, index) => (
            <tr key={index}>
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
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default WaggleListPage;
