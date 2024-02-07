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
  MsgDay,
  MsgHM,
  SenderImg,
  ChattingSendImg,
} from "../../styles/MatchStyles/MatchChattingStyle";
import SendIcon from "../../assets/icon/send-icon.png";
import { UserState } from "../../global/UserState";

function Chat() {
  const { matchId } = useParams();
  const roomId = matchId;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [userState] = useRecoilState(UserState);
  const { nickname } = userState;
  const { profile } = userState;
  const { mainBadge } = userState;
  const sender = nickname;

  const recvPrevMessages = () => {
    axios
      .get(`/match/chat/message/${roomId}`)
      .then((response) => {
        const { data } = response;
        setMessages(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    const domain = process.env.REACT_APP_DOMAIN;
    const socket = new SockJS(`${domain}:8040/ws/chat`);
    const stomp = Stomp.over(socket);

    // This effect runs only once when the component mounts
    stomp.connect({}, (frame) => {
      stomp.subscribe(`/topic/chat/room/${roomId}`, (message) => {
        console.log(message);
        recvMessage(JSON.parse(message.body));
      });
    });

    recvPrevMessages();
    // Set stompClient state to ensure it persists across re-renders
    setStompClient(stomp);
    console.log("stomp", stomp);

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      stomp.disconnect();
    };
  }, [roomId]); // Empty dependency array ensures this effect runs only once on mount

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
      isUser: true, // 현재 사용자가 보낸 메시지
    };

    stompClient.send("/app/chat/message", JSON.stringify(data), []);
    setMessage("");
  };

  const recvMessage = (recv) => {
    setMessages((messages) => [
      ...messages,
      {
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
        date: recv.date,
        profile: recv.profile,
        mainBadge: recv.mainBadge,
        isUser: false, // 다른 사용자가 보낸 메시지
      },
    ]);
  };

  const chatBox = useRef();

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages]);

  // const handleScroll = () => {
  //   if (chatBox.current) {
  //     const gap = 83.984;
  //     const scrollTotalHeight = (messages.length - 4) * gap;
  //     const currentMessage = Math.ceil(
  //       (scrollTotalHeight - chatBox.current.scrollTop) / gap,
  //     );
  //     console.log("currentMessage", currentMessage);

  //     if (currentMessage >= 1) {
  //       const timeDaysGap = moment
  //         .duration(
  //           moment().diff(
  //             moment(messages[messages.length - 4 - currentMessage].date),
  //           ),
  //         )
  //         .asDays();
  //       if (timeDaysGap > 1) {
  //         // 여기서 처리
  //         // 문제점 채팅이 길어져서
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (chatBox.current) {
  //     chatBox.current.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (chatBox.current) {
  //       chatBox.current.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  return (
    <div>
      <ChattingBox ref={chatBox}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "user-message" : "other-message"}
          >
            <MessageContainer isMine={nickname === message.sender}>
              <MessageBox>
                <InfoBox isMine={nickname === message.sender}>
                  <SenderImg src={message.profile} />
                  <OnlyNick>{message.sender}</OnlyNick>
                  <BadgeImg
                    src={`${process.env.PUBLIC_URL}/badge/badge${message.mainBadge === null ? 0 : message.mainBadge}.png`}
                  />
                </InfoBox>
                <MessageInfoBox isMine={nickname === message.sender}>
                  <OnlyMsg isMine={nickname === message.sender}>
                    {message.message}
                  </OnlyMsg>
                  <MsgTimeContainer>
                    {/* <MsgDay>
                      {moment(message.date, "YYYY-MM-DD HH:mm:ss").format(
                        "MM-DD",
                      )}
                    </MsgDay> */}
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
        {/* <ChattingPlusImg src={ChatPlusIcon} /> */}
        <ChattingInput>
          <input
            type="text"
            id="message"
            value={message}
            placeholder="메시지 작성"
            style={{
              border: "none",
              outline: "none",
              width: "90%",
              height: "100%",
              backgroundColor: "#f1f1f1",
            }}
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
    </div>
  );
}

export default Chat;
