import React, { createContext, useEffect, useState } from 'react';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { NotificationState } from "./NotificationState";
import { useSetRecoilState, useRecoilState } from "recoil";
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
                newNotifications: [...prevNotificationState.newNotifications, notification],
            };
        });
    };

    useEffect(() => {

        console.log("isLoggedIn: ", userState.isLoggedIn);

        const connectSocket = () => {
            const socket = new SockJS('http://localhost:8010/ws/notification');
            const stomp = Stomp.over(socket);
            
            stomp.connect({}, (frame) => {
                stomp.subscribe(`/topic/notification/${userState.email}:${userState.domain}`, (message) => {
                    console.log(message);
                    recvNotification(JSON.parse(message.body));
                })
            });

            setStompClient(stomp);
        };
        
        if (userState.isLoggedIn) {
            console.log("Socket Connected!!!");
            connectSocket();

            // 알림 목록 불러오기
            axios.get("/user/users/notifications")
            .then((res) => {
                console.log(res.data);
        
                // 기존 알림 상태를 덮어쓰기
                setNotification({
                    notifications: res.data.filter(notification => notification.readFlag),
                    newNotifications: res.data.filter(notification => !notification.readFlag),
                });
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            if (stompClient) {
                console.log("Socket Disconnected!!!");
                stompClient.disconnect();
                setStompClient(null);
            }
        }


        return () => {
            if (!userState.isLoggedIn && stompClient) {
                console.log("Socket Disconnected!!!");
                stompClient.disconnect();
                setStompClient(null);
            }
        };
    }, [userState.isLoggedIn]);

    return (
        <SocketContext.Provider value={ stompClient }>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;