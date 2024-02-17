import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import Stomp from "webstomp-client";
import moment from "moment";
import axios from "../../api/axios";
import {
  ChattingBox,
  MessageContainer,
  InfoBox,
  MessageInfoBox,
  ChattingInput,
  ChattingBar,
  MessageBox,
  OnlyNick,
  BadgeImg,
  OnlyMsg,
  MsgTimeContainer,
  ChattingSendImg,
  MsgHM,
  SenderImg,
  CleanBot,
  BigChattingContainer,
} from "../../styles/match-styles/MatchChattingStyle";
import SendIcon from "../../assets/icon/send-icon.png";

import { UserState } from "../../global/UserState";

function Chat({ match, setMatch }) {
  const { matchId } = useParams();
  const roomId = matchId;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rejectedMessage, setRejectedMessage] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [userState] = useRecoilState(UserState);
  const { nickname } = userState;
  const { profile } = userState;
  const { mainBadge } = userState;

  const recvPrevMessages = () => {
    axios
      .get(`/match/chat/message/${roomId}`)
      .then((response) => {
        const { data } = response;
        setMessages([...data]);
      })
      .catch(() => {});
  };

  useEffect(() => {
    const domain = process.env.REACT_APP_DOMAIN;
    const socket = new SockJS(`${domain}:8040/ws/chat`);
    const stomp = Stomp.over(socket);

    stomp.connect({}, (frame) => {
      stomp.subscribe(`/topic/chat/room/${roomId}`, (message) => {
        recvMessage(JSON.parse(message.body));
      });
    });

    recvPrevMessages();
    setStompClient(stomp);

    return () => {
      stomp.disconnect();
    };
  }, [roomId]);

  const getTimeLines = (matchId) => {
    axios
      // .get(`https://k-l1verse.site:8040/matches/timelines/${matchId}`)
      .get(`http://localhost:8040/matches/timelines/${matchId}`)
      .then((res) => {
        if (res.data) {
          let changeHomeScore = 0;
          let changeAwayScore = 0;

          res.data.forEach((timeline) => {
            if (timeline.eventName === "득점") {
              if (timeline.homeOrAway === "HOME") {
                changeHomeScore += 1;
              } else {
                changeAwayScore += 1;
              }
            }
          });
          if (
            match.homeScore !== changeHomeScore ||
            match.awayScore !== changeAwayScore
          ) {
            setMatch((prev) => ({
              ...prev,
              homeScore: changeHomeScore,
              awayScore: changeAwayScore,
            }));
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getTimeLines(matchId);

    const interval = setInterval(() => {
      getTimeLines(matchId);
    }, [10000]);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendMessage = () => {
    if (message === "") return;

    const data = {
      type: "TALK",
      roomId: Number(roomId),
      sender: nickname,
      message,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      profile,
      mainBadge,
      isUser: true,
    };

    stompClient.send("/app/chat/message", JSON.stringify(data), []);
    setMessage("");
  };

  const recvMessage = (recv) => {
    if (recv.type === "REJECT") {
      setRejectedMessage(recv);
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        messageId: recv.messageId,
        message: recv.message,
        date: recv.date,
        profile: recv.profile,
        mainBadge: recv.mainBadge,
        isUser: false,
      },
    ]);
  };

  useEffect(() => {
    if (rejectedMessage === null) return;
    if (rejectedMessage === undefined) return;

    const rejectedMessageIndex = messages.findIndex(
      (msg) => msg.messageId === rejectedMessage.messageId,
    );

    if (rejectedMessageIndex !== -1) {
      const updatedMessages = [...messages];

      updatedMessages[rejectedMessageIndex].message =
        "❤️클린봇에 의해 검열된 메세지입니다.";

      setMessages(updatedMessages);
    }

    setRejectedMessage(null);
  }, [rejectedMessage, messages]);

  const chatBox = useRef();

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages]);

  return (
    <BigChattingContainer>
      <CleanBot>
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png"
          alt="Robot"
          width="22"
          height="22"
        />
        <div>
          <div>클린봇</div>
          <div>이 악성표현을 감지합니다.</div>
        </div>
      </CleanBot>
      <ChattingBox ref={chatBox}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "user-message" : "other-message"}
          >
            <MessageContainer $isMine={nickname === message.sender}>
              <MessageBox>
                <InfoBox $isMine={nickname === message.sender}>
                  <SenderImg src={message.profile} />
                  <OnlyNick>{message.sender}</OnlyNick>
                  <BadgeImg
                    src={`${process.env.PUBLIC_URL}/badge/badge${message.mainBadge === null ? 0 : message.mainBadge}back.png`}
                  />
                </InfoBox>
                <MessageInfoBox $isMine={nickname === message.sender}>
                  <OnlyMsg $isMine={nickname === message.sender}>
                    {message.message}
                  </OnlyMsg>
                  <MsgTimeContainer>
                    <MsgHM>
                      {moment(message.date, "YYYY-MM-DD HH:mm:ss").format(
                        "hh:mm",
                      )}
                    </MsgHM>
                  </MsgTimeContainer>
                </MessageInfoBox>
              </MessageBox>
            </MessageContainer>
          </div>
        ))}
      </ChattingBox>
      <ChattingBar>
        <ChattingInput>
          <input
            type="text"
            id="message"
            value={message}
            placeholder="메시지 작성"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </ChattingInput>
        <ChattingSendImg src={SendIcon} onClick={sendMessage} />
      </ChattingBar>
    </BigChattingContainer>
  );
}

export default Chat;
