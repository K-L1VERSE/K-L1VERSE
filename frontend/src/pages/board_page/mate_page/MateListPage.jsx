import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMateList, getMatesByMatchList } from "../../../api/mate";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import MateContainer from "../../../components/board/MateContainer";
import {
  Header,
  HeaderButton,
  HeaderDiv,
  ToggleContainer,
  ToggleComponent,
  ToggleText,
} from "../../../styles/BoardStyles/BoardStyle";
import MatchSchedulePage from "../../match_page/MatchSchedulePage";

function MateListPage() {
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [mateList, setMateList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMatchIdExists, setIsMatchIdExists] = useState(true);
  const [isMateListExists, setIsMateListExists] = useState(true);
  const navigate = useNavigate();

  const handleMatchClick = (selectedMatchId) => {
    setSelectedMatchId(selectedMatchId);
    console.log("selectedMatchId:???????????????? ", selectedMatchId);
  };

  useEffect(() => {
    getMates();
  }, [selectedMatchId]);

  function getMates() {
    if (selectedMatchId) {
      getMatesByMatchList(
        selectedMatchId,
        ({ data }) => {
          if (!data) {
            setHasMore(false);
            setIsMatchIdExists(true);
            setIsMateListExists(false);
            console.log("isMateListExists false", data);
          } else {
            setIsMatchIdExists(true);
            setIsMateListExists(true);
            setMateList([...mateList, ...data.content]);
            setPage(page + 1);
            console.log("isMateListExists true", data);
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
  }, [selectedMatchId]);

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

  const [isToggled, setIsToggled] = useState(false);

  const handleToggele = () => {
    console.log("isToggled: ", isToggled);
    setIsToggled(!isToggled);
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

      <ToggleContainer>
        <ToggleComponent>
          <button onClick={handleToggele} type="button">
            {isToggled ? (
              <ToggleText>
                경기 일정 펼치기&nbsp;&nbsp;
                <FontAwesomeIcon icon={faCaretDown} />
              </ToggleText>
            ) : (
              <ToggleText>
                경기 일정 접기&nbsp;&nbsp; <FontAwesomeIcon icon={faCaretUp} />
              </ToggleText>
            )}
          </button>
        </ToggleComponent>
      </ToggleContainer>

      {isToggled ? (
        <div />
      ) : (
        <MatchSchedulePage
          isMateListPage={true}
          onMatchClick={handleMatchClick}
        />
      )}

      {isMatchIdExists ? (
        isMateListExists ? (
          <MateContainer mateList={mateList} />
        ) : (
          <p>해당하는 경기의 게시글이 없습니다.</p>
        )
      ) : (
        <MateContainer mateList={mateList} />
      )}

      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default MateListPage;
