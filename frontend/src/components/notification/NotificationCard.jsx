import {
  NotificationContainer,
  NotificationIcon,
  NotificationMessage,
} from "../../styles/notification-styles/NotificationStyle";
import CommentIcon from "../../assets/icon/comment-icon.png";
import GoalIcon from "../../assets/icon/goal-icon.png";
import MatchIcon from "../../assets/icon/match-icon.png";
import LikeIcon from "../../assets/icon/like-icon.png";
import NewsIcon from "../../assets/icon/news-icon.png";

function NotificationCard({ notification, handleNotificationClick }) {
  return (
    <NotificationContainer
      onClick={() => handleNotificationClick(notification.uri)}
    >
      {notification.type === "GOAL" ? (
        <NotificationIcon src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Soccer_ball_animated.svg" />
      ) : notification.type === "MATCH" ? (
        <NotificationIcon src={MatchIcon} style={{ marginBottom: "0.4rem" }} />
      ) : notification.type === "COMMENT" ? (
        <NotificationIcon src={CommentIcon} />
      ) : notification.type === "LIKE" ? (
        <NotificationIcon src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" />
      ) : (
        <NotificationIcon src={NewsIcon} />
      )}
      <NotificationMessage>{notification.content}</NotificationMessage>
    </NotificationContainer>
  );
}

export default NotificationCard;
