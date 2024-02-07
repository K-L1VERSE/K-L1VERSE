import NotificationCard from "./NotificationCard";

function NotificationList({ notifications, handleNotificationClick }) {
  const notificationList = [...notifications].reverse();

  return (
    <>
      {notificationList.map((notification, i) => (
        <NotificationCard
          notification={notification}
          handleNotificationClick={handleNotificationClick}
          key={i}
        />
      ))}
    </>
  );
}

export default NotificationList;
