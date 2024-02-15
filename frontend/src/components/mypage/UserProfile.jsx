import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { ModifyingState, UserState } from "../../global/UserState";

import BadgeButton from "./BadgeButton";
import ProfileIcon from "../../assets/icon/profile-icon.png";

import axios from "../../api/axios";

import EditNicknameModal from "./EditNicknameModal";

const ProfileTitleContainer = styled.div`
  display: flex;
  padding: 1rem 1rem 0.75rem 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
`;

const ProfileTitleIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

const ProfileTitleText = styled.div`
  color: var(--blue1, #026);
  font-size: 1rem;
  font-family: "Pretendard-Bold";
  padding-top: 0.2rem;
`;

const ProfileTitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

const ProfileSettingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProfileSettingImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const ProfileEditContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-left: 0.25rem;
`;

const ProfileEditIcon = styled.img`
  width: 0.9rem;
  margin-left: 0.2rem;
  cursor: pointer;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem 0.75rem 1rem;
`;

const UserInfoContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserProfile = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
  }
  background:
    url(),
    lightgray 50% / cover no-repeat;
`;

const UserProfileInput = styled.input`
  display: none; // 숨김
`;

const UserNickName = styled.div`
  color: var(--gray1, #222);
  font-family: "Pretendard-Bold";
  font-size: 1.1rem;
`;

function UserInfo({ user, setUser }) {
  useEffect(() => {}, [user]);

  const setUserState = useSetRecoilState(UserState);
  const setModifyingState = useSetRecoilState(ModifyingState);

  const [selectedImage, setSelectedImage] = useState(null);

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
          const { url } = res.data;
          axios
            .post("/user/users/profile", { profile: res.data.url })
            .then(() => {
              reader.readAsDataURL(file);
              setUserState((prev) => ({ ...prev, profile: url }));
              setUser(() => {
                const temp = { ...user };
                temp.profile = url;
                return temp;
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  };

  useEffect(() => {}, [selectedImage]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModifyingState((prev) => ({ ...prev, modifyingNickname: true }));
    setIsModalOpen(true);
  };

  const navigate = useNavigate();
  const goSetting = () => {
    navigate("/setting", {
      state: { user },
    });
  };

  return (
    <>
      <ProfileTitleContainer>
        <ProfileTitleContent>
          <ProfileTitleIcon src={ProfileIcon} />
          <ProfileTitleText>프로필</ProfileTitleText>
        </ProfileTitleContent>
        <ProfileSettingContainer onClick={goSetting}>
          <ProfileSettingImg src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" />
        </ProfileSettingContainer>
      </ProfileTitleContainer>
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
          <BadgeButton mainBadge={user.mainBadge} user={user} />
          <UserNickName>{user.nickname}</UserNickName>
          <ProfileEditContent onClick={handleModalOpen}>
            <ProfileEditIcon src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Wrench.png" />
          </ProfileEditContent>
        </UserInfoContent>
      </UserInfoContainer>

      {isModalOpen && (
        <EditNicknameModal
          type="modify"
          setModalOpen={setIsModalOpen}
          user={user}
          setUser={setUser}
        />
      )}
    </>
  );
}

export default UserInfo;
