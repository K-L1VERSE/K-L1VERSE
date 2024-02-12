import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserProfile from "../../components/mypage/UserProfile";
import axios from "../../api/axios";

import Usergoal from "../../components/mypage/Usergoal";
import {
  BoardContainer,
  BoardText,
  BoardList,
  NoBoardContainer,
  NoBoardBox,
  NoBoardText,
  NoBoardImg,
  GoBoardButton,
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
import { get } from "jquery";

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
    state && state.category ? state.category : "1",
  );
  const [myBoard, setMyBoard] = useState([]);
  const [isAxios, setIsAxios] = useState(false);
  const [isCategoryChange, setIsCategoryChange] = useState(false);

  /* 유저 정보 가져오기 */
  const getUserInfo = () => {
    axios
      .get("/user/users/mypage")
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {});
  };

  /* 카테고리 변경 시 호출될 훅 */
  const getMyWagle = () => {
    setIsAxios(false);
    let type = "";
    if (category === "1") {
      type = "waggles";
    } else if (category === "2") {
      type = "mates";
    } else {
      type = "products";
    }

    if (user.userId) {
      axios
        .post(`/board/${type}/myPage`, {
          userId: user.userId,
        })
        .then(({ data }) => {
          setIsAxios(true);
          setIsCategoryChange(false);
          setMyBoard(data.content);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (category) {
      setIsCategoryChange(true);
      setMyBoard([]);
      getMyWagle();
    }
  }, [category]);

  useEffect(() => {
    if (!user.userId) {
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    if (user.userId) {
      getMyWagle();
    }
  }, [user]);

  const navigate = useNavigate();
  const goWaggle = () => {
    navigate("/waggle");
  };
  const goMate = () => {
    navigate("/mate");
  };
  const goProduct = () => {
    navigate("/product");
  };

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
        {category === "1" &&
          isAxios &&
          !isCategoryChange &&
          (myBoard.length > 0 ? (
            <WaggleContainer
              waggleList={myBoard.reverse()}
              formatRelativeTime={formatRelativeTime}
              user={user}
              fromMypage={fromMypage}
              category={category}
            />
          ) : (
            <NoBoardContainer>
              <NoBoardBox>
                <NoBoardText>작성한 글이 없어요 </NoBoardText>
                <NoBoardImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Sweat.png" />
              </NoBoardBox>
              <GoBoardButton onClick={goWaggle}>글 쓰러 가기</GoBoardButton>
            </NoBoardContainer>
          ))}
        {category === "2" &&
          isAxios &&
          !isCategoryChange &&
          (myBoard.length > 0 ? (
            <MateContainer
              mateList={myBoard.reverse()}
              user={user}
              fromMypage={fromMypage}
              category={category}
            />
          ) : (
            <NoBoardContainer>
              <NoBoardBox>
                <NoBoardText>작성한 글이 없어요 </NoBoardText>
                <NoBoardImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Sweat.png" />
              </NoBoardBox>
              <GoBoardButton onClick={goMate}>글 쓰러 가기</GoBoardButton>
            </NoBoardContainer>
          ))}
        {category === "3" &&
          isAxios &&
          !isCategoryChange &&
          (myBoard.length > 0 ? (
            <ProductContainer
              productList={myBoard.reverse()}
              formatRelativeTime={formatRelativeTime}
              user={user}
              fromMypage={fromMypage}
              category={category}
            />
          ) : (
            <NoBoardContainer>
              <NoBoardBox>
                <NoBoardText>작성한 글이 없어요 </NoBoardText>
                <NoBoardImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Sweat.png" />
              </NoBoardBox>
              <GoBoardButton onClick={goProduct}>글 쓰러 가기</GoBoardButton>
            </NoBoardContainer>
          ))}
      </div>
    </>
  );
}

export default MyPage;
