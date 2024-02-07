import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { NotificationState } from "../../global/NotificationState";
import {
  HeaderContainer,
  HeaderBox,
  HeaderImg,
  HeaderText,
} from "../../styles/notification-styles/NotificationStyle";
import NotificationList from "../../components/notification/NotificationList";

import axios from "../../api/axios";

function Notification() {
  const [notificationState, setNotificationState] =
    useRecoilState(NotificationState);

  useEffect(() => {
    axios
      .get("/user/users/notifications/read")
      .then(() => {
        setNotificationState((prev) => ({
          ...prev,
          notifications: [...prev.notifications, ...prev.newNotifications],
          newNotifications: [],
        }));
      })
      .catch(() => {});
  }, []);

  const navigate = useNavigate();

  const handleNotificationClick = (uri) => {
    if (uri.includes("http") || uri.includes("https")) {
      window.open(uri);
    } else {
      navigate(uri);
    }
  };

  return (
    <div>
      <HeaderContainer>
        <HeaderBox>
          <HeaderImg
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bell.png"
            alt="Bell"
          />
          <HeaderText>알림</HeaderText>
        </HeaderBox>
      </HeaderContainer>
      <NotificationList
        notifications={notificationState.notifications}
        handleNotificationClick={handleNotificationClick}
      />
    </div>
  );
}

export default Notification;
