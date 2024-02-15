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
  Small,
  MateListContainer,
  NoPost,
} from "../../../styles/BoardStyles/BoardStyle";
import ScheduleModal from "../../../components/board/toggle/ScheduleModal";

function MateListPage() {
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [mateList, setMateList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstClick, setIsFirstClick] = useState(false);
  const navigate = useNavigate();

  const handleMatchClick = (selectedMatchId) => {
    setSelectedMatchId(selectedMatchId);
  };

  function getMates() {
    if (selectedMatchId) {
      if (isFirstClick) {
        setIsFirstClick(false);
        getMatesByMatchList(
          selectedMatchId,
          page,
          ({ data }) => {
            if (data.content.length > 0) {
              // const temp = [...mateList];
              // temp.push(...data.content);
              // setMateList(temp);
              // setPage(page + 1);
              setMateList(data.content);
              setPage(page + 1);
            }
          },
          () => {},
        );
      } else {
        getMatesByMatchList(
          selectedMatchId,
          page,
          ({ data }) => {
            if (data.content.length > 0) {
              const temp = [...mateList];
              temp.push(...data.content);
              setMateList(temp);
              setPage(page + 1);
            }
          },
          () => {},
        );
      }
    } else {
      getMateList(
        page,
        10,
        ({ data }) => {
          if (data.length > 0) {
            const temp = [...mateList];
            temp.push(...data);
            setMateList(temp);
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

  useEffect(() => {
    if (selectedMatchId) {
      setPage(0);
      setMateList([]);

      if (!isFirstClick) {
        setIsFirstClick(true);
      }
    }
  }, [selectedMatchId]);

  useEffect(() => {
    if (isFirstClick) {
      getMates();
    }
  }, [isFirstClick]);

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
      getMates();
    }
  }, [isBottom]);

  const handleWriteMateClick = () => {
    navigate("/mateRegist");
  };

  const [isToggled, setIsToggled] = useState(true);

  const handleToggele = () => {
    setIsToggled(!isToggled);
  };

  return (
    <MateListContainer>
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
        <HeaderButton onClick={handleWriteMateClick}>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pencil.png"
            alt="Pencil"
            width="15"
            height="15"
          />
          <div>&nbsp;글쓰기</div>
        </HeaderButton>
      </Header>
      <ToggleContainer>
        <ToggleComponent>
          <button onClick={handleToggele} type="button">
            {isToggled ? (
              <div>
                캘린더&nbsp;&nbsp;
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            ) : (
              <div>
                캘린더&nbsp;&nbsp; <FontAwesomeIcon icon={faCaretUp} />
              </div>
            )}
          </button>
        </ToggleComponent>
      </ToggleContainer>
      {isToggled ? (
        <div />
      ) : (
        <Small>
          <ScheduleModal
            isMateListPage={true}
            onMatchClick={handleMatchClick}
            selectedMatchId={selectedMatchId}
          />
        </Small>
      )}
      {!selectedMatchId && mateList.length > 0 && (
        <MateContainer mateList={mateList} />
      )}
      {selectedMatchId && mateList.length > 0 && (
        <MateContainer mateList={mateList} />
      )}
      {selectedMatchId && mateList.length === 0 && (
        <NoPost>해당하는 경기의 게시글이 없습니다.</NoPost>
      )}
      {!hasMore && <p>No more data</p>}
    </MateListContainer>
  );
}

export default MateListPage;
