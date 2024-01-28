// WaggleListPage.js

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import "../../../styles/BoardStyles/WaggleListStyle.css"; // Import the new CSS file

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

  // =========날짜 포맷팅 함수 ==========
  // 날짜 포맷팅 함수
  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "ko-KR",
      options,
    );
    return formattedDate;
  }

  // 상대적인 시간 표시 함수
  function formatRelativeTime(dateString) {
    const now = new Date();
    const createdAt = new Date(dateString);
    const timeDifference = now - createdAt;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      // 24시간 이상 전 작성된 경우 날짜 형식으로 반환
      return formatDate(dateString);
    } else if (hours > 0) {
      // 1시간 이상 24시간 미만 전 작성된 경우 'n시간 전' 형식으로 반환
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      // 1분 이상 1시간 미만 전 작성된 경우 'n분 전' 형식으로 반환
      return `${minutes}분 전`;
    } else {
      // 1분 미만 전 작성된 경우 '방금 전' 형식으로 반환
      return "방금 전";
    }
  }

  return (
    <div>
      <BoardTopNavBar />
      <div className="waggle-header">
        <h2>와글와글 떠들어주세요</h2>
        <button onClick={handleWriteWaggleClick}>🖋글쓰기</button>
      </div>

      <div className="waggle-list">
        {waggleList.map((waggle, index) => (
          <div key={index} className="waggle-item">
            {/* 클릭 시 상세 페이지로 이동하도록 Link 사용 */}
            <div className="title">
              <Link to={`/waggle/${waggle.board.boardId}`}>
                {waggle.board.title}
              </Link>
            </div>
            <div className="content">
              <Link to={`/waggle/${waggle.board.boardId}`}>
                <p>{waggle.board.content}</p>
              </Link>
            </div>
            <div className="info-section">
              <div className="waggle-like">
                좋아요 {waggle.board.likeCount} |
              </div>
              <div className="waggle-comment">
                댓글 {waggle.board.commentCount} |
              </div>
              <div className="waggle-created-at">
                {formatRelativeTime(waggle.board.createAt)}
              </div>
            </div>
            <div className="separator"></div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default WaggleListPage;
