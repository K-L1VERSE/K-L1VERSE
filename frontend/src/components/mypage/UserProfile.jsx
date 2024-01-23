import React, { useEffect } from "react";
import styled from "styled-components";
import BadgeButton from "./BadgeButton";

const ProfileTitleContainer = styled.div`
  display: inline-flex;
  padding: 12px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ProfileTitleIcon = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ProfileTitleText = styled.div`
  color: var(--blue1, #026);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ProfileTitleHeader = styled.div`
  display: flex;
  width: 358px;
  justify-content: space-between;
  align-items: center;
`;

const ProfileTitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProfileEditContent = styled.div`
  display: flex;
  width: 45px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const ProfileEditIcon = styled.div`
  color: var(--blue1, #026);
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProfileEditText = styled.div`
  color: var(--blue1, #026);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const UserInfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserProfile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background:
    url(),
    lightgray 50% / cover no-repeat;
`;

const UserNickName = styled.div`
  color: var(--gray1, #222);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

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
      <ProfileTitleContainer>
        <ProfileTitleHeader>
          <ProfileTitleContent>
            <ProfileTitleIcon>👤</ProfileTitleIcon>
            <ProfileTitleText>프로필</ProfileTitleText>
          </ProfileTitleContent>
          <ProfileEditContent>
            <ProfileEditIcon>🛠️</ProfileEditIcon>
            <ProfileEditText>수정</ProfileEditText>
          </ProfileEditContent>
        </ProfileTitleHeader>
        <UserInfoContainer>
          <UserInfoContent>
            <UserProfile />
            <BadgeButton />
            <UserNickName>김민재굉장하다{user.nickname}</UserNickName>
          </UserInfoContent>
        </UserInfoContainer>
      </ProfileTitleContainer>
    </div>
  );
}

export default UserInfo;
