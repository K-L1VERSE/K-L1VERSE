import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "../../../api/axios";
import BoardTopNavBar from "../../../components/Board/BoardTopNavBar";
import "../../../styles/BoardStyles/MateListStyle.css";
import MateItemCard from "../../../components/Board/MateItemCard";

function MateListPage() {
  const [mateList, setMateList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const fetchMateList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/board/mates/pages?page=${page}&size=30&sort=board.createAt,desc`,
      );
      const newMates = response.data.content;

      if (newMates.length === 0) {
        setHasMore(false);
      } else {
        const uniqueMates = newMates.filter(
          (newMate) =>
            !mateList.some(
              (mate) => mate.board.boardId === newMate.board.boardId,
            ),
        );

        setMateList((prevMates) => [...prevMates, ...uniqueMates]);
      }
    } finally {
      setLoading(false);
    }
  }, [page, mateList]);

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
      fetchMateList();
    }
  }, [fetchMateList, hasMore, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleWriteMateClick = () => {
    navigate("/mateRegist");
  };

  const handleCalendarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <BoardTopNavBar />
      <div className="mate-header">
        <h2>저랑 같이 응원 갈래욤?</h2>
        <button onClick={handleWriteMateClick}> 🖋글쓰기</button>
      </div>
      <button onClick={handleCalendarToggle}>📆</button>
      {isOpen && <Calendar onChange={onChange} value={value} />}

      <div className="mate-list">
        {mateList.map((mate, index) => (
          <MateItemCard key={index} mate={mate} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default MateListPage;
