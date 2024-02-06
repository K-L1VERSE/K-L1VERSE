import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  Text,
  Nav,
  NavItem,
  Contents,
  navbarScheduleIcon,
  navbarTeamInfoIcon,
  navbarNotificationIcon,
  navbarMyPageIcon,
} from "../../styles/navbar-styles/NavbarStyle";
import Logo from "../../assets/K-L1VERSE(white).png";
import { NotificationState } from "../../global/NotificationState";

export default function Header() {
  const [notificationState, setNotificationState] =
    useRecoilState(NotificationState);

  const navigate = useNavigate();

  const goMatchSchedule = () => {
    navigate("/matchSchedule");
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
    if (currentPath === "/matchSchedule") {
      setState([true, false, false, false]);
    } else if (currentPath === "/team") {
      setState([false, true, false, false]);
    } else if (currentPath === "/") {
      setState([false, false, false, false]);
    } else if (currentPath === "/notification") {
      setState([false, false, true, false]);
    } else if (currentPath === "/mypage") {
      setState([false, false, false, true]);
    }
  }, [currentPath]);

  return (
    <>
      <Contents>
        <Outlet />
      </Contents>
      <Nav>
        <NavItem onClick={goMatchSchedule}>
          {navbarScheduleIcon({ isSelected: state[0] })}
          <Text isSelected={state[0]}>경기일정</Text>
        </NavItem>
        <NavItem onClick={goTeam}>
          {navbarTeamInfoIcon({ isSelected: state[1] })}
          <Text isSelected={state[1]}>팀정보</Text>
        </NavItem>
        <NavItem onClick={goMain}>
          <img src={Logo} alt="logo" width={50} />
        </NavItem>
        <NavItem onClick={goNotification}>
          {navbarNotificationIcon({ isSelected: state[2] })}
          {notificationState.newNotifications.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "14px",
                right: "120px",
                display: "flex",
                background: "red",
                borderRadius: "50%",
                width: "3px",
                height: "3px",
                padding: "2px",
              }}
            />
          )}
          <Text isSelected={state[2]}>알림</Text>
        </NavItem>
        <NavItem onClick={goMypage}>
          {/* <MyPageIcon /> */}
          {navbarMyPageIcon({ isSelected: state[3] })}
          <Text isSelected={state[3]}>마이페이지</Text>
        </NavItem>
      </Nav>
    </>
  );
}
