import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWaggleList } from "../../../api/waggle";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import WaggleContainer from "../../../components/board/WaggleContainer";
import { formatRelativeTime } from "../../../components/board/dateFormat";
import {
  Header,
  HeaderButton,
  HeaderDiv,
} from "../../../styles/BoardStyles/BoardStyle";
// import SearchComponent from "../../../components/board/SearchComponent";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  function getWaggles() {
    getWaggleList(
      page,
      10,
      ({ data }) => {
        if (!data) {
          setHasMore(false);
        } else {
          setWaggleList([...waggleList, ...data]);
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

  // const handleSearch = (searchResult) => {
  //   setWaggleList(searchResult);
  // };

  return (
    <div>
      <BoardTopNavBar />
      <Header>
        <HeaderDiv>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Big%20Eyes.png"
            alt="Grinning Face with Big Eyes"
            width="25"
            height="25"
          />
          <div>와글Waggle 떠들어주세요</div>
        </HeaderDiv>
        <HeaderButton onClick={handleWriteWaggleClick}>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pencil.png"
            alt="Pencil"
            width="15"
            height="15"
          />
          <div>&nbsp;글쓰기</div>
        </HeaderButton>
      </Header>
      {/* <SearchComponent onSearch={handleSearch} /> */}

      <WaggleContainer
        waggleList={waggleList}
        formatRelativeTime={formatRelativeTime}
      />
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default WaggleListPage;
