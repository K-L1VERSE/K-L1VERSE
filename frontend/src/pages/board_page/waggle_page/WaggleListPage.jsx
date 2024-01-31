// WaggleListPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import WaggleItemCard from "../../../components/Board/WaggleItemCard";
import { formatRelativeTime } from "../../../components/Board/dateFormat";
import {
  WaggleHeader,
  WaggleHeaderH2,
  WaggleHeaderButton,
  WaggleListContainer,
} from "../../../styles/BoardStyles/WaggleListStyle";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWaggleList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/board/waggles/pages?page=${page}&size=30&sort=board.createAt,desc`,
      );
      const newWaggles = response.data.content;

      if (newWaggles.length === 0) {
        setHasMore(false);
      } else {
        const uniqueWaggles = newWaggles.filter(
          (newWaggle) =>
            !waggleList.some(
              (waggle) => waggle.board.boardId === newWaggle.board.boardId,
            ),
        );

        setWaggleList((prevWaggles) => [...prevWaggles, ...uniqueWaggles]);
      }
    } finally {
      setLoading(false);
    }
  }, [page, waggleList]);

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const distanceFromBottom = documentHeight - scrollTop - windowHeight;

    if (distanceFromBottom < 200 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (hasMore) {
      fetchWaggleList();
    }
  }, [fetchWaggleList, hasMore, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleWriteWaggleClick = () => {
    navigate("/waggleRegist");
  };

  return (
    <div>
      <BoardTopNavBar />
      <WaggleHeader>
        <WaggleHeaderH2>와글와글 떠들어주세요</WaggleHeaderH2>
        <WaggleHeaderButton onClick={handleWriteWaggleClick}>
          🖋글쓰기
        </WaggleHeaderButton>
      </WaggleHeader>

      <WaggleListContainer>
        {waggleList.map((waggle, index) => (
          <WaggleItemCard
            key={index}
            waggle={waggle}
            formatRelativeTime={formatRelativeTime}
          />
        ))}
      </WaggleListContainer>
    </div>
  );
}

export default WaggleListPage;
