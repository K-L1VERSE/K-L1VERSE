import { useEffect } from "react";
import { UserState } from "../../global/UserState";
import { NotificationState } from "../../global/NotificationState";
import { useRecoilState, useSetRecoilState } from "recoil";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

import Notification from "../../components/notification/Notification";

function Main() {

    const [user] = useRecoilState(UserState);
    const setNotificationState = useSetRecoilState(NotificationState);

    const recvNotification = (notification) => {
        setNotificationState((prevNotificationState) => {
        return {
            notifications: [...prevNotificationState.notifications, notification],
        };
        });
    };

    useEffect(() => {
        if(user.accessToken) {
        console.log("user updated!!!!!!!!!!", user);
        const socket = new SockJS("http://localhost:8010/ws/notification");
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.subscribe(
            `/topic/notification/${user.email}:${user.domain}`,
            (message) => {
                console.log(message);
                recvNotification(JSON.parse(message.body));
            }
            )});
        }
    }, [user]);

    return (
        <div>
            <Notification />
        </div>
    );
}

export default Main;