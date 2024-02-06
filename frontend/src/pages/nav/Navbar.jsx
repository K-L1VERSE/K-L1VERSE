import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ReactComponent as MyPageIcon } from "../../assets/icon/mypage-icon.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icon/notification-icon.svg";
import { ReactComponent as ScheduleIcon } from "../../assets/icon/schedule-icon.svg";
import { ReactComponent as TeaminfoIcon } from "../../assets/icon/teaminfo-icon.svg";
import {
  Text,
  Nav,
  NavItem,
  Contents,
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

  const goMain = () => {
    navigate("/");
  };

  const goMypage = () => {
    navigate("/mypage");
  };

  const goNotification = () => {
    navigate("/notification");
  };

  return (
    <>
      <Contents>
        <Outlet />
      </Contents>
      <Nav>
        <NavItem>
          <ScheduleIcon onClick={goMatchSchedule} />
          <Text>경기일정</Text>
        </NavItem>
        <NavItem>
          <TeaminfoIcon />
          <Text>팀정보</Text>
        </NavItem>
        <NavItem onClick={goMain}>
          <img src={Logo} alt="logo" width={50} />
        </NavItem>
        <NavItem onClick={goNotification}>
          <NotificationIcon />
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
          <Text>알림</Text>
        </NavItem>
        <NavItem onClick={goMypage}>
          <MyPageIcon />
          <Text>마이페이지</Text>
        </NavItem>
      </Nav>
    </>
  );
}
