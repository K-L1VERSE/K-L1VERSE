import {
  NotificationBox,
  NotificationContainer,
  NotificationItems,
  NotificationDeleteText,
  NotificationIcon,
  NotificationMessage,
  NotificationUserImg,
  NotificationUserNickname,
  NotificationMatchContainer,
  NotificationMatchTeamContainer,
  NotificationMatchImg,
  NotificationMatchText,
  NotificationMatchVersus,
} from "../../styles/notification-styles/NotificationStyle";
import CommentIcon from "../../assets/icon/comment-icon.png";
import MatchIcon from "../../assets/icon/match-icon.png";
import NewsIcon from "../../assets/icon/news-icon.png";

function NotificationCard({
  notification,
  handleNotificationClick,
  deleteNotification,
}) {
  const teamNames = {
    1: "울산",
    2: "포항",
    3: "제주",
    4: "전북",
    5: "서울",
    6: "대전",
    7: "대구",
    8: "인천",
    9: "강원",
    10: "광주",
    11: "수원",
    12: "김천 상무",
  };

  return (
    <NotificationBox>
      <NotificationContainer>
        <NotificationItems
          onClick={() => handleNotificationClick(notification.uri)}
        >
          {notification.type === "GOAL" ? (
            <NotificationIcon src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Soccer_ball_animated.svg" />
          ) : notification.type === "MATCH" ? (
            <>
              <NotificationIcon
                src={MatchIcon}
                style={{ marginBottom: "0.4rem" }}
              />
              <NotificationMatchContainer>
                <NotificationMatchTeamContainer>
                  <NotificationMatchImg
                    src={`${process.env.PUBLIC_URL}/badge/badge${notification.homeTeamId}.png`}
                  />
                  <NotificationMatchText>
                    {teamNames[notification.homeTeamId]}
                  </NotificationMatchText>
                </NotificationMatchTeamContainer>
                <NotificationMatchVersus>vs</NotificationMatchVersus>
                <NotificationMatchTeamContainer>
                  <NotificationMatchImg
                    src={`${process.env.PUBLIC_URL}/badge/badge${notification.awayTeamId}.png`}
                  />
                  <NotificationMatchText>
                    {teamNames[notification.awayTeamId]}
                  </NotificationMatchText>
                </NotificationMatchTeamContainer>
              </NotificationMatchContainer>
            </>
          ) : notification.type === "COMMENT" ? (
            <>
              <NotificationIcon src={CommentIcon} />
              <NotificationUserImg src={notification.profile} />
              <NotificationUserNickname>
                {notification.nickname}
              </NotificationUserNickname>
            </>
          ) : notification.type === "LIKE" ? (
            <>
              <NotificationIcon src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" />
              <NotificationUserImg src={notification.profile} />
              <NotificationUserNickname>
                {notification.nickname}
              </NotificationUserNickname>
            </>
          ) : (
            <NotificationIcon src={NewsIcon} />
          )}
          <NotificationMessage>{notification.content}</NotificationMessage>
        </NotificationItems>
        <NotificationDeleteText
          onClick={() => deleteNotification(notification)}
        >
          X
        </NotificationDeleteText>
      </NotificationContainer>
    </NotificationBox>
  );
}

export default NotificationCard;
