import { NotificationState } from "../../global/NotificationState";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "../../api/authAxios";
import { useEffect } from "react";

function Main() {

    const setNotification = useSetRecoilState(NotificationState);
    const [notificationState, setNotificationState] = useRecoilState(NotificationState);

    useEffect(() => {
        axios.get("/users/notifications")
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
    }, []);

    const handleNotification = () => {
        window.location.href = "/notification";
    }

    return (
        <div>
            <button type="button" onClick={handleNotification} style={{ backgroundColor: notificationState.newNotifications.length > 0 ? 'red' : 'inherit'}}>
                알림
            </button>
        </div>
    );
}

export default Main;