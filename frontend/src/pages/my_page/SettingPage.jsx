import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../../global/UserState";
import SettingItem from "../../components/mypage/SettingItem";
import { SurveyTop, ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";
import { SettingText, Line } from "../../styles/mypage-styles/SettingStyle";
import Bell from "../../assets/icon/bell-icon.png";
import Personal from "../../assets/icon/personal-data-icon.png";
import Logout from "../../assets/icon/logout-icon.png";
import axios from "../../api/axios";

export default function SettingPage() {
  const [userState, setUserState] = useRecoilState(UserState);
  const { email, notificationFlag } = userState;
  const navigate = useNavigate();

  const goMypage = () => {
    navigate("/mypage");
  };

  const goLogin = () => {
    navigate("/login");
  };

  const updateNotificationFlag = () => {
    axios
      .put("/user/users/notifications/flag")
      .then(() => {
        setUserState({ ...userState, notificationFlag: !notificationFlag });
      })
      .catch(() => {});
  };

  return (
    <div>
      <SurveyTop>
        <ToLeftImg src={ToLeftPng} onClick={goMypage} />
        마이 페이지
      </SurveyTop>
      <SettingText>계정 설정</SettingText>
      <Line />
      <SettingItem type="email" src={Personal} text={email} />
      <Line />
      <SettingItem
        type="notification"
        src={Bell}
        text="알림 설정"
        notificationFlag={notificationFlag}
        updateNotificationFlag={updateNotificationFlag}
      />
      <Line />
      <SettingItem
        type="logout"
        src={Logout}
        text="로그아웃"
        goLogin={goLogin}
      />
    </div>
  );
}
