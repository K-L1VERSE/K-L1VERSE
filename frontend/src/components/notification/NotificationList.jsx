import NotificationCard from "./NotificationCard";

function NotificationList({
  notifications,
  handleNotificationClick,
  deleteNotification,
}) {
  const notificationList = [...notifications].reverse();

  return (
    <>
      {notificationList.map((notification, i) => (
        <NotificationCard
          notification={notification}
          handleNotificationClick={handleNotificationClick}
          deleteNotification={deleteNotification}
          key={i}
        />
      ))}
    </>
  );
}

export default NotificationList;
