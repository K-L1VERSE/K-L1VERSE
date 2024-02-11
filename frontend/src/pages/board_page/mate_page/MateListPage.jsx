import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMateList, getMatesByMatchList } from "../../../api/mate";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import MateContainer from "../../../components/board/MateContainer";
import {
  Header,
  HeaderButton,
  HeaderDiv,
} from "../../../styles/BoardStyles/BoardStyle";
import MatchSchedulePage from "../../match_page/MatchSchedulePage";

function MateListPage() {
  const [selectedMatchId, setSelectedMatchId] = useState(null); // Initialize to null
  const [mateList, setMateList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMatchIdExists, setIsMatchIdExists] = useState(true);
  const navigate = useNavigate();

  const handleMatchClick = (selectedMatchId) => {
    setSelectedMatchId(selectedMatchId);
    console.log("selectedMatchId:???????????????? ", selectedMatchId);
  };

  function getMates() {
    if (selectedMatchId) {
      getMatesByMatchList(
        selectedMatchId,
        ({ data }) => {
          if (!data.content) {
            setHasMore(false);
            setIsMatchIdExists(false);
          } else {
            setIsMatchIdExists(true);
            setMateList([...mateList, ...data.content]);
            setPage(page + 1);
          }
        },
        () => {},
      );
    } else {
      getMateList(
        page,
        10,
        ({ data }) => {
          if (!data.content) {
            setHasMore(false);
            setIsMatchIdExists(false);
          } else {
            setMateList([...mateList, ...data.content]);
            setPage(page + 1);
          }
        },
        () => {},
      );
    }
  }

  useEffect(() => {
    getMates();
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
    if (isBottom && !selectedMatchId) {
      getMates();
    }
  }, [isBottom, selectedMatchId]);

  const handleWriteMateClick = () => {
    navigate("/mateRegist");
  };

  return (
    <div>
      <BoardTopNavBar />
      <Header>
        <HeaderDiv>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Clapping%20Hands%20Light%20Skin%20Tone.png"
            alt="Clapping Hands Light Skin Tone"
            width="25"
            height="25"
          />
          <div>경기 직관 함께 할 메이트 구합니다</div>
        </HeaderDiv>
        <HeaderButton onClick={handleWriteMateClick}>🖋 글쓰기</HeaderButton>
      </Header>
      <MatchSchedulePage
        isMateListPage={true}
        onMatchClick={handleMatchClick}
      />
      {isMatchIdExists ? (
        <MateContainer mateList={mateList} />
      ) : (
        <p>해당하는 경기의 게시글이 없습니다.</p>
      )}
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default MateListPage;
