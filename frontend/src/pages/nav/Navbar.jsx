import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { NotificationState } from "../../global/NotificationState";
import { UserState, ModifyingState } from "../../global/UserState";
import {
  Text,
  Nav,
  NavItem,
  Contents,
  navbarScheduleIcon,
  navbarTeamInfoIcon,
  navbarNotificationIcon,
  navbarMyPageIcon,
  RedCircle,
} from "../../styles/navbar-styles/NavbarStyle";
import Logo from "../../assets/K-L1VERSE(white).png";

export default function Header() {
  const [notificationState] = useRecoilState(NotificationState);
  const [userState] = useRecoilState(UserState);
  const { nickname } = userState;
  const [modifyingState] = useRecoilState(ModifyingState);
  const { modifyingNickname } = modifyingState;

  const navigate = useNavigate();

  const goMatchSchedule = () => {
    navigate("/schedule");
  };

  const goTeam = () => {
    navigate("/team");
  };

  const goMain = () => {
    navigate("/");
  };

  const goMypage = () => {
    navigate("/mypage");
  };

  const goNotification = () => {
    navigate("/notification");
  };

  const currentPath = window.location.pathname;
  const [state, setState] = useState([false, false, false, false]);

  useEffect(() => {
    if (currentPath === "/schedule") {
      setState([true, false, false, false]);
    } else if (currentPath === "/team") {
      setState([false, true, false, false]);
    } else if (currentPath === "/notification") {
      setState([false, false, true, false]);
    } else if (
      currentPath === "/mypage" ||
      currentPath === "/setting" ||
      currentPath === "/badge"
    ) {
      setState([false, false, false, true]);
    } else {
      setState([false, false, false, false]);
    }
  }, [currentPath]);

  const disabled = nickname === null || modifyingNickname;

  return (
    <>
      <Contents>
        <Outlet />
      </Contents>
      <Nav $modifyingNickname={modifyingNickname} $disabled={nickname === null}>
        <NavItem onClick={goMatchSchedule} $disabled={disabled}>
          {navbarScheduleIcon({ $isSelected: state[0] })}
          <Text $isSelected={state[0]}>경기일정</Text>
        </NavItem>
        <NavItem onClick={goTeam} $disabled={disabled}>
          {navbarTeamInfoIcon({ $isSelected: state[1] })}
          <Text $isSelected={state[1]}>팀정보</Text>
        </NavItem>
        <NavItem onClick={goMain} $disabled={disabled}>
          <img src={Logo} alt="logo" width={50} />
        </NavItem>
        <NavItem onClick={goNotification} $disabled={disabled}>
          {navbarNotificationIcon({ $isSelected: state[2] })}
          {notificationState.newNotifications.length > 0 &&
            currentPath !== "/notification" && <RedCircle />}
          <Text $isSelected={state[2]}>알림</Text>
        </NavItem>
        <NavItem onClick={goMypage} $disabled={disabled}>
          {/* <MyPageIcon /> */}
          {navbarMyPageIcon({ $isSelected: state[3] })}
          <Text $isSelected={state[3]}>마이페이지</Text>
        </NavItem>
      </Nav>
    </>
  );
}
