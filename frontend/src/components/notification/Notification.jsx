import { useRecoilState } from "recoil";
import { NotificationState } from "../../global/NotificationState";

function Notification() {

    const [notificationState, setNotificationState] = useRecoilState(NotificationState);
    console.log("notificationState", notificationState);

    return (
        <div>
            <div>
                <ul>
                    {notificationState.notifications.map((notification, index) => (
                        <li key={index}>
                            <span>{notification.type} - {notification.message}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Notification;