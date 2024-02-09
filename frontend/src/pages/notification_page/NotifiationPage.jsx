import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { NotificationState } from "../../global/NotificationState";
import { UserState } from "../../global/UserState";
import {
  HeaderContainer,
  HeaderBox,
  HeaderImg,
  HeaderText,
  NotRecvNotificationTextContainer,
  NotRecvNotificationText,
} from "../../styles/notification-styles/NotificationStyle";
import NotificationList from "../../components/notification/NotificationList";

import axios from "../../api/axios";

function Notification() {
  const [notificationState, setNotificationState] =
    useRecoilState(NotificationState);

  const [userState] = useRecoilState(UserState);
  const { notificationFlag } = userState;

  useEffect(() => {
    if (notificationFlag && notificationState.newNotifications.length > 0) {
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
    }
  }, [notificationState.newNotifications.length]);

  const navigate = useNavigate();

  const handleNotificationClick = (uri) => {
    if (uri.includes("http") || uri.includes("https")) {
      window.open(uri);
    } else {
      navigate(uri);
    }
  };

  const deleteNotification = (notification) => {
    const newNotifications = notificationState.notifications.filter(
      (n) => n.notificationId !== notification.notificationId,
    );
    setNotificationState((prev) => ({
      ...prev,
      notifications: newNotifications,
    }));

    axios
      .delete("/user/users/notifications", {
        data: {
          notificationId: notification.notificationId,
        },
      })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <>
      <HeaderContainer>
        <HeaderBox>
          <HeaderImg
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bell.png"
            alt="Bell"
          />
          <HeaderText>알림</HeaderText>
        </HeaderBox>
      </HeaderContainer>
      {notificationFlag ? (
        <NotificationList
          notifications={notificationState.notifications}
          handleNotificationClick={handleNotificationClick}
          deleteNotification={deleteNotification}
        />
      ) : (
        <NotRecvNotificationTextContainer>
          <NotRecvNotificationText>
            알림 설정이 꺼져있습니다.
          </NotRecvNotificationText>
        </NotRecvNotificationTextContainer>
      )}
    </>
  );
}

export default Notification;
