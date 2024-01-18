import React, { useEffect, useState } from "react";
import UserInfo from "../../components/mypage/UserInfo";
import axios from "../../api/axios";
// import mockAxios from "../../api/mockAxios";

function MyPage() {
  const [user, setUser] = useState({
    userId: "",
    nickname: "",
    profile: "",
    mainBadge: "",
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
      .get("/users")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log(url);
    axios
      .get(url)
      .then(({ data }) => {
        console.log(data);
        setMyWagle(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(`${category}로 변경됨`);
    getMyWagle();
  }, [category]);

  console.log(user);

  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
}

export default MyPage;
