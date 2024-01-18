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

  console.log(user);

  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
}

export default MyPage;
