import React, { createContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { useSetRecoilState, useRecoilState } from "recoil";

import { NotificationState } from "./NotificationState";
import { UserState } from "./UserState";
import axios from "../api/axios";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);

  const setNotificationState = useSetRecoilState(NotificationState);
  const [notification, setNotification] = useRecoilState(NotificationState);
  const [userState, setUserState] = useRecoilState(UserState);

  const recvNotification = (notification) => {
    setNotificationState((prevNotificationState) => {
      return {
        notifications: [...prevNotificationState.notifications],
        newNotifications: [
          ...prevNotificationState.newNotifications,
          notification,
        ],
      };
    });
  };

  useEffect(() => {
    const connectSocket = () => {
      const domain = process.env.REACT_APP_DOMAIN;
      const socket = new SockJS(`${domain}:8010/ws/notification`);
      const stomp = Stomp.over(socket);

      stomp.connect({}, (frame) => {
        stomp.subscribe(
          `/topic/notification/${userState.email}:${userState.domain}`,
          (message) => {
            recvNotification(JSON.parse(message.body));
          },
        );
      });

      setStompClient(stomp);
    };

    if (
      userState.isLoggedIn &&
      ![
        "/login",
        "/logout",
        "/KakaoAuth",
        "/GoogleAuth",
        "/NaverAuth",
      ].includes(window.location.pathname)
    ) {
      connectSocket();
      axios
        .get("/user/users/notifications")
        .then((res) => {
          setNotification({
            notifications: res.data.filter(
              (notification) => notification.readFlag,
            ),
            newNotifications: res.data.filter(
              (notification) => !notification.readFlag,
            ),
          });
        })
        .catch(() => {});
    } else if (!userState.isLoggedIn && stompClient) {
      stompClient.disconnect();
      setStompClient(null);
    }
    return () => {
      if (!userState.isLoggedIn && stompClient) {
        stompClient.disconnect();
        setStompClient(null);
      }
    };
  }, [userState.isLoggedIn]);

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
