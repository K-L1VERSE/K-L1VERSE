import React, { useEffect, useState } from "react";
import UserProfile from "../../components/mypage/UserProfile";
import axios from "../../api/axios";
// import mockAxios from "../../api/mockAxios";

import RadioGroup from "../../components/common/RadioGroup";
import Radio from "../../components/common/Radio";
import MyWagle from "../../components/mypage/MyWagle";
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

function MyPage() {
  const [user, setUser] = useState({
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
  });

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
    getUserInfo();
  }, []);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState();
  const [myWagle, setMyWagle] = useState([]);
  /* 카테고리 변경 시 호출될 훅 */
  const getMyWagle = () => {
    const url = `/wagles?user_id=${user.userId}&category=${category}&pageno=${page}`;
    axios
      .get(url)
      .then(({ data }) => {
        setMyWagle(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getMyWagle();
    console.log(selectedValue);
  }, [category]);

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div>
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
      <div>{WaggleContainer({ waggleList: myWagle })}</div>
    </div>
  );
}

export default MyPage;
