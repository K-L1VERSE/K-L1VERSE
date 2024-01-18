import React, { useEffect } from "react";

function UserInfo({ user }) {
  /* 유저 닉네임 변경 버튼 이벤트 */
  const editUserInfo = () => {
    console.log("editUserInfo");
  };

  /* 유저 정보 바뀔 때마다 호출될 훅 */
  useEffect(() => {
    console.log("user정보 수정");
  }, [user]);

  return (
    <div>
      <div>
        프로필 사진 : <span>{user.profile}</span>
      </div>
      <div>
        이름 : {user.nickname}
        <button type="button" onClick={editUserInfo}>
          수정
        </button>
      </div>
      <div> 대표 뱃지 : {user.mainBadge} </div>
      <div> 골 : {user.goal}</div>
      <div> 적중률 : {user.mainBadge}</div>
      <div>
        뱃지
        <div> 팀 1 : {user.badge.team1}</div>
        <div> 팀 2 : {user.badge.team2}</div>
        <div> 팀 3 : {user.badge.team3}</div>
        <div> 팀 4 : {user.badge.team4}</div>
        <div> 팀 5 : {user.badge.team5}</div>
        <div> 팀 6 : {user.badge.team6}</div>
        <div> 팀 7 : {user.badge.team7}</div>
        <div> 팀 8 : {user.badge.team8}</div>
        <div> 팀 9 : {user.badge.team9}</div>
        <div> 팀 10 : {user.badge.team10}</div>
        <div> 팀 11 : {user.badge.team11}</div>
        <div> 팀 12 : {user.badge.team12}</div>
      </div>
    </div>
  );
}

export default UserInfo;
