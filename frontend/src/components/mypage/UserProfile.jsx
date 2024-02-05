import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserState } from "../../global/UserState";

import styled from "styled-components";
import BadgeButton from "./BadgeButton";
import LogoutButton from "./LogoutButton";

import axios from "../../api/axios";

import EditNicknameModal from "./EditNicknameModal";

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

  width: 358px;
  justify-content: space-between;
  align-items: center;
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

const UserProfileInput = styled.input`
  display: none; // 숨김
`;

const UserNickName = styled.div`
  color: var(--gray1, #222);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function UserInfo({ user, setUser }) {
  /* 유저 닉네임 변경 버튼 이벤트 */
  const editUserInfo = () => {
    console.log("editUserInfo");
  };

  /* 유저 정보 바뀔 때마다 호출될 훅 */
  useEffect(() => {
    console.log("user정보 수정");
  }, [user]);

  const setUserState = useSetRecoilState(UserState);

  const [selectedImage, setSelectedImage] = useState(null);

  /* 프로필 이미지 선택 시 처리 함수 */
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("/user/file/upload", formData)
        .then((res) => {
          const url = res.data.url;
          axios
            .post("/user/users/profile", { profile: res.data.url })
            .then((res) => {
              reader.readAsDataURL(file);
              setUserState((prev) => ({ ...prev, profile: url }));
              setUser(() => {
                const temp = { ...user };
                temp.profile = url;
                return temp;
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /* 이미지를 선택할 때마다 호출될 훅 */
  useEffect(() => {
    console.log("프로필 이미지 수정");
  }, [selectedImage]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <ProfileTitleContainer>
        <ProfileTitleHeader>
          <ProfileTitleContent>
            <ProfileTitleIcon>👤</ProfileTitleIcon>
            <ProfileTitleText>프로필</ProfileTitleText>
          </ProfileTitleContent>
          <ProfileEditContent onClick={handleModalOpen}>
            <ProfileEditIcon>🛠️</ProfileEditIcon>
            <ProfileEditText>수정</ProfileEditText>
          </ProfileEditContent>
        </ProfileTitleHeader>
        <UserInfoContainer>
          <UserInfoContent>
            <label htmlFor="profileImageInput">
              <UserProfile src={selectedImage || user.profile} />
            </label>
            <UserProfileInput
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleImageChange}
            />
            <BadgeButton />
            <UserNickName>{user.nickname}</UserNickName>
          </UserInfoContent>
        </UserInfoContainer>
      </ProfileTitleContainer>

      {/* EditNickname Modal */}
      {isModalOpen && (
        <EditNicknameModal
          setModalOpen={setIsModalOpen}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default UserInfo;
