import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
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

export default function Header() {
  const navigate = useNavigate();

  const goMain = () => {
    navigate("/");
  };

  const goMypage = () => {
    navigate("/mypage");
  };

  return (
    <>
      <Contents>
        <Outlet />
      </Contents>
      <Nav>
        <NavItem>
          <ScheduleIcon />
          <Text>경기일정</Text>
        </NavItem>
        <NavItem>
          <TeaminfoIcon />
          <Text>팀정보</Text>
        </NavItem>
        <NavItem onClick={goMain}>
          <img src={Logo} alt="logo" width={50} />
        </NavItem>
        <NavItem>
          <NotificationIcon />
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
