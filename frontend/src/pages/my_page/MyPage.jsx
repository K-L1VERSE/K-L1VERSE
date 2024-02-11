import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "../../components/mypage/UserProfile";
import axios from "../../api/axios";

import Usergoal from "../../components/mypage/Usergoal";
import {
  BoardContainer,
  BoardText,
  BoardList,
} from "../../styles/mypage-styles/MypageStyle";

import {
  Nav,
  WaggleButton,
  MateButton,
  ProductButton,
} from "../../styles/BoardStyles/BoardTopNavbarStyle";
import WaggleContainer from "../../components/board/WaggleContainer";
import MateContainer from "../../components/board/MateContainer";
import ProductContainer from "../../components/board/ProductContainer";
import { formatRelativeTime } from "../../components/board/dateFormat";

function MyPage() {
  const fromMypage = true;
  const location = useLocation();
  const { state } = location;

  const [user, setUser] = useState(
    state && state.user
      ? state.user
      : {
          userId: "",
          nickname: "",
          profile: "",
          mainBadge: "0",
          goal: 0,
          accurate: 0.0,
          totalBet: 0,
          winBet: 0,
          badge: {
            team1: false,
            team2: false,
            team3: false,
            team4: false,
            team5: false,
            team6: false,
            team7: false,
            team8: false,
            team9: false,
            team10: false,
            team11: false,
            team12: false,
          },
        },
  );
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(
    state && state.category ? state.category : "",
  );
  const [myBoard, setMyBoard] = useState([]);

  /* 유저 정보 가져오기 */
  const getUserInfo = () => {
    axios
      .get("/user/users/mypage")
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!user.userId) {
      getUserInfo();
    }
  }, []);

  /* 카테고리 변경 시 호출될 훅 */
  const getMyWagle = () => {
    let type = "";
    if (category === "1") {
      type = "waggles";
    } else if (category === "2") {
      type = "mates";
    } else {
      type = "products";
    }

    if (user.userId) {
      setMyBoard([]);
      axios
        .post(`/board/${type}/myPage`, {
          userId: user.userId,
        })
        .then(({ data }) => {
          setMyBoard(data.content);
        })
        .catch(() => {});
    }
  };

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (category) {
      getMyWagle();
    }
  }, [category]);

  return (
    <>
      <UserProfile user={user} setUser={setUser} />
      <Usergoal user={user} />
      <BoardContainer>
        <BoardText>내가 작성한 글</BoardText>
      </BoardContainer>
      <BoardList>
        <Nav>
          <WaggleButton
            className={category === "1" ? "active" : ""}
            onClick={() => setCategory("1")}
          >
            ⚽️ 와글와글
          </WaggleButton>
          <MateButton
            className={category === "2" ? "active" : ""}
            onClick={() => setCategory("2")}
          >
            👋🏻 직관 메이트
          </MateButton>
          <ProductButton
            className={category === "3" ? "active" : ""}
            onClick={() => setCategory("3")}
          >
            📦 중고거래
          </ProductButton>
        </Nav>
      </BoardList>
      <div>
        {category === "1" && (
          <WaggleContainer
            waggleList={myBoard.reverse()}
            formatRelativeTime={formatRelativeTime}
            user={user}
            fromMypage={fromMypage}
            category={category}
          />
        )}
        {category === "2" && <MateContainer mateList={myBoard} fromMypage />}
        {category === "3" && (
          <ProductContainer
            productList={myBoard.reverse()}
            formatRelativeTime={formatRelativeTime}
            user={user}
            fromMypage={fromMypage}
            category={category}
          />
        )}
      </div>
    </>
  );
}

export default MyPage;
