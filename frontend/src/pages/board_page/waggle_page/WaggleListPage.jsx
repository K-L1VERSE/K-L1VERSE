import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchWaggleList, getWaggleList } from "../../../api/waggle";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import WaggleContainer from "../../../components/board/WaggleContainer";
import { formatRelativeTime } from "../../../components/board/dateFormat";
import {
  Header,
  HeaderButton,
  HeaderH2,
} from "../../../styles/BoardStyles/BoardStyle";
import SearchComponent from "../../../components/board/SearchComponent";

function WaggleListPage() {
  const [waggleList, setWaggleList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const getWaggles = (page) => {
    // 검색 중이 아닌 경우에만 전체 게시글 목록을 가져옴
    if (isSearching) {
      getSearchWaggleList(
        searchKeyword,
        page,
        10,
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
    } else {
      // 검색 중이 아닐 때
      getWaggleList(
        page,
        10,
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
  };

  useEffect(() => {
    getWaggles(page);
  }, [page, isSearching, searchKeyword]);

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
      getWaggles(page + 1);
    }
  }, [isBottom, page, isSearching, searchKeyword]);

  const handleWriteWaggleClick = () => {
    navigate("/waggleRegist");
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setWaggleList([]);
    setPage(0);
    setHasMore(true);
    setIsSearching(true);
    getWaggles(0);
  };

  return (
    <div>
      <BoardTopNavBar />
      <Header>
        <HeaderH2>👥 와글와글 떠들어주세요</HeaderH2>
        <HeaderButton onClick={handleWriteWaggleClick}>🖋 글쓰기</HeaderButton>
      </Header>

      <SearchComponent onSearch={handleSearch} />

      <WaggleContainer
        waggleList={waggleList}
        formatRelativeTime={formatRelativeTime}
      />
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default WaggleListPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getWaggleList } from "../../../api/waggle";
// import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
// import WaggleContainer from "../../../components/board/WaggleContainer";
// import { formatRelativeTime } from "../../../components/board/dateFormat";
// import {
//   Header,
//   HeaderButton,
//   HeaderH2,
// } from "../../../styles/BoardStyles/BoardStyle";

// function WaggleListPage() {
//   const [waggleList, setWaggleList] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const navigate = useNavigate();

//   function getWaggles() {
//     getWaggleList(
//       page,
//       10,
//       ({ data }) => {
//         if (!data.content) {
//           setHasMore(false);
//         } else {
//           setWaggleList([...waggleList, ...data.content]);
//           setPage(page + 1);
//         }
//       },
//       () => {},
//     );
//   }

//   useEffect(() => {
//     getWaggles();
//   }, []);

//   const [isBottom, setIsBottom] = useState(false);

//   if (hasMore) {
//     const handleScroll = () => {
//       const scrollTop =
//         (document.documentElement && document.documentElement.scrollTop) ||
//         document.body.scrollTop;
//       const scrollHeight =
//         (document.documentElement && document.documentElement.scrollHeight) ||
//         document.body.scrollHeight;
//       if (scrollTop + window.innerHeight >= scrollHeight) {
//         setIsBottom(true);
//       } else {
//         setIsBottom(false);
//       }
//     };

//     useEffect(() => {
//       window.addEventListener("scroll", handleScroll);
//       return () => {
//         window.removeEventListener("scroll", handleScroll);
//       };
//     }, []);
//   }

//   useEffect(() => {
//     if (isBottom) {
//       getWaggles();
//     }
//   }, [isBottom]);

//   const handleWriteWaggleClick = () => {
//     navigate("/waggleRegist");
//   };

//   return (
//     <div>
//       <BoardTopNavBar />
//       <Header>
//         <HeaderH2>와글와글 떠들어주세요</HeaderH2>
//         <HeaderButton onClick={handleWriteWaggleClick}>🖋 글쓰기</HeaderButton>
//       </Header>

//       <WaggleContainer
//         waggleList={waggleList}
//         formatRelativeTime={formatRelativeTime}
//       />
//       {!hasMore && <p>No more data</p>}
//     </div>
//   );
// }

// export default WaggleListPage;
