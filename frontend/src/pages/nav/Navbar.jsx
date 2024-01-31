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
import { useRecoilState } from "recoil";
import { NotificationState } from "../../global/NotificationState";

export default function Header() {
  (function () {
    var w = window;
    if (w.ChannelIO) {
      return w.console.error("ChannelIO script included twice.");
    }
    var ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      var x = document.getElementsByTagName("script")[0];
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x);
      }
    }
    if (document.readyState === "complete") {
      l();
    } else {
      w.addEventListener("DOMContentLoaded", l);
      w.addEventListener("load", l);
    }
  })();

  ChannelIO("boot", {
    pluginKey: "e6c79081-3a8d-4b7f-8f9d-c90be614e40a",
  });

  const [notificationState, setNotificationState] =
    useRecoilState(NotificationState);

  const navigate = useNavigate();

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
            ></div>
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
