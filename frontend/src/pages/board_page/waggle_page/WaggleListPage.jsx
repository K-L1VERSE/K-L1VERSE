import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWaggleList, getRecommendWaggleList } from "../../../api/waggle";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import WaggleContainer from "../../../components/board/WaggleContainer";
import { formatRelativeTime } from "../../../components/board/dateFormat";
import {
  Header,
  HeaderButton,
  HeaderDiv,
  Info,
  Button2,
} from "../../../styles/BoardStyles/BoardStyle";
import { Button } from "../../../styles/BoardStyles/BoardDetailStyle";
// import SearchComponent from "../../../components/board/SearchComponent";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isRecommend, setIsRecommend] = useState(false);
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

  function getRecommendWaggles() {
    getRecommendWaggleList(
      page,
      {
        userId: 1,
      },
      ({ data }) => {
        if (!data) {
          setHasMore(false);
        } else {
          setWaggleList([...waggleList, ...data]);
          setPage(page + 1);
        }
      },
    );
  }

  const [btnName, setBtnName] = useState("추천받기 !");
  const handleRecommendClick = () => {
    if (!isRecommend) {
      setBtnName("돌아가기 !");
      setPage(0);
      setWaggleList([]);
      setIsRecommend(true);
    } else {
      setBtnName("추천받기 !");
      setPage(0);
      setWaggleList([]);
      setIsRecommend(false);
    }
  };

  useEffect(() => {
    if (isRecommend) {
      getRecommendWaggles();
    } else {
      getWaggles();
    }
  }, [isRecommend]);

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
    if (isBottom && !isRecommend) {
      getWaggles();
    } else if (isBottom && isRecommend) {
      getRecommendWaggles();
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
          <Info>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Big%20Eyes.png"
              alt="Grinning Face with Big Eyes"
              width="25"
              height="25"
            />
            와글와글 떠들어주세요
          </Info>
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
      <Button2>
        <Button onClick={handleRecommendClick}>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20Decoration.png"
            alt="Heart Decoration"
            width="35"
            height="35"
          />
        </Button>
        <div>&nbsp; 👈🏻 {btnName}</div>
        {/* <div>&nbsp; 👈🏻 추천받아보아요</div> */}
      </Button2>
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
