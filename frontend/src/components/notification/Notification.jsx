import { useRecoilState } from "recoil";
import { NotificationState } from "../../global/NotificationState";
import axios from "../../api/axios";
import { useEffect } from "react";

function Notification() {

    const [notificationState, setNotificationState] = useRecoilState(NotificationState);
    console.log("notificationState", notificationState);

    useEffect(() => {
        axios.get("/user/users/notifications/read")
        .then((res) => {
            setNotificationState((prev) => ({
            ...prev,
            notifications: [...prev.notifications, ...prev.newNotifications],
            newNotifications: [],
            }));


        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const handleNotificationClick = (uri) => {
        window.location.href = uri;
    }

    return (
        <div>
            <h1>알림 목록</h1>
            <ul>
                {/* 역순으로 보여주기 위해 reverse & [...]을 이용하여 깊은 복사 후 사용 */}
                {[...notificationState.notifications].reverse().map((notification, index) => (
                    <li key={index}>
                        <button type="button" onClick={() => handleNotificationClick(notification.uri)}>
                            {/* 여기에서 type에 따라 다른 이미지를 보여줄 수 있습니다. */}
                            {notification.type === 'GOAL' && <img src="goal_image_url" alt="Goal Icon" />}
                            {/* 내용을 보여줍니다. */}
                            <p>{notification.content}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notification;