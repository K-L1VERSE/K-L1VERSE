import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWaggleList } from "../../../api/waggle";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import WaggleContainer from "../../../components/board/WaggleContainer";
import { formatRelativeTime } from "../../../components/board/dateFormat";
import {
  Header,
  HeaderButton,
  HeaderH2,
} from "../../../styles/BoardStyles/BoardStyle";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  function getWaggles() {
    getWaggleList(
      page,
      30,
      ({ data }) => {
        if (!data.content) {
          setHasMore(false);
        } else {
          setWaggleList([...waggleList, ...data.content]);
          setPage(page + 1);
        }
      },
      () => {},
    );
  }

  useEffect(() => {
    getWaggles();
  }, []);

  const [isBottom, setIsBottom] = useState(false);

  if (hasMore) {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      if (scrollTop + window.innerHeight >= scrollHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  }

  useEffect(() => {
    if (isBottom) {
      getWaggles();
    }
  }, [isBottom]);

  const handleWriteWaggleClick = () => {
    navigate("/waggleRegist");
  };

  return (
    <div>
      <BoardTopNavBar />
      <Header>
        <HeaderH2>와글와글 떠들어주세요</HeaderH2>
        <HeaderButton onClick={handleWriteWaggleClick}>🖋 글쓰기</HeaderButton>
      </Header>

      <WaggleContainer
        waggleList={waggleList}
        formatRelativeTime={formatRelativeTime}
      />
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default WaggleListPage;
