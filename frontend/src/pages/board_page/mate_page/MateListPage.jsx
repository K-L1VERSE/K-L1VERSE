import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
import { getMateList } from "../../../api/mate";
import BoardTopNavBar from "../../../components/board/BoardTopNavBar";
import {
  MateHeader,
  MateHeaderH2,
  MateHeaderButton,
  MateListContainer,
} from "../../../styles/BoardStyles/MateListStyle";
import MateItemCard from "../../../components/board/MateItemCard";

function MateListPage() {
  const [mateList, setMateList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  // const [value, onChange] = useState(new Date());
  // const [isOpen, setIsOpen] = useState(false);

  function getMates() {
    getMateList(
      page,
      30,
      ({ data }) => {
        if (!data.content) {
          setHasMore(false);
        } else {
          setMateList([...mateList, ...data.content]);
          setPage(page + 1);
        }
      },
      () => {},
    );
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
    if (isBottom) {
      getMates();
    }
  }, [isBottom]);

  const handleWriteMateClick = () => {
    navigate("/mateRegist");
  };

  // const handleCalendarToggle = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div>
      <BoardTopNavBar />
      <MateHeader>
        <MateHeaderH2>저랑 같이 응원 갈래욤?</MateHeaderH2>
        <MateHeaderButton onClick={handleWriteMateClick}>
          🖋글쓰기
        </MateHeaderButton>
      </MateHeader>
      {/* <button onClick={handleCalendarToggle}>📆</button> */}
      {/* {isOpen && <Calendar onChange={onChange} value={value} />} */}

      <MateListContainer>
        {mateList.map((mate) => (
          <MateItemCard key={mate.mateId} mate={mate} />
        ))}
      </MateListContainer>
      {!hasMore && <p>No more data</p>}
    </div>
  );
}

export default MateListPage;
