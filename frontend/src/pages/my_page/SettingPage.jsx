import React from "react";
import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { UserState } from "../../global/UserState";
import SettingItem from "../../components/mypage/SettingItem";
import { SurveyTop, ToLeftImg } from "../../styles/SurveyStyles/SurveyTop";
import ToLeftPng from "../../assets/ToLeft.png";
import { SettingText, Line } from "../../styles/mypage-styles/SettingStyle";
import Bell from "../../assets/icon/bell-icon.png";
import Personal from "../../assets/icon/personal-data-icon.png";
import Logout from "../../assets/icon/logout-icon.png";

export default function SettingPage() {
  //   const user = useRecoilState(UserState);
  const navigate = useNavigate();

  const goMypage = () => {
    navigate("/mypage");
  };

  return (
    <div>
      <SurveyTop>
        <ToLeftImg src={ToLeftPng} onClick={goMypage} />
        마이 페이지
      </SurveyTop>
      <SettingText>계정 설정</SettingText>
      <Line />
      {/* <SettingItem type="email" src={Personal}  text={user.email}  /> */}
      <SettingItem type="email" src={Personal} text="eomso19@naver.com" />
      <Line />
      <SettingItem type="notification" src={Bell} text="알림 설정" />
      <Line />
      <SettingItem type="logout" src={Logout} text="로그아웃" />
    </div>
  );
}
