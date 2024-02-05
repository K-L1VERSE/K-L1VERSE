import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import Stomp from "webstomp-client";
import moment from "moment";
import {
  ChattingTop,
  ChattingBox,
  ChattingInput,
  ChattingSendBtn,
  ChattingBar,
  MessageBox,
  OnlyNick,
  OnlyMsg,
  SenderImg,
} from "../../styles/MatchStyles/MatchChattingStyle";
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
  const sender = nickname;

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

    // Set stompClient state to ensure it persists across re-renders
    setStompClient(stomp);
    console.log("stomp", stomp);

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      stomp.disconnect();
    };
  }, [roomId]); // Empty dependency array ensures this effect runs only once on mount

  const sendMessage = () => {
    const data = {
      type: "TALK",
      roomId: Number(roomId),
      sender: nickname,
      message,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      profile,
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
  return (
    <div style={{ border: "4px solid yellow" }}>
      <ChattingTop>커피는 TOP....</ChattingTop>
      <ChattingBox ref={chatBox}>
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? "user-message" : "other-message"}
            >
              <MessageBox>
                <SenderImg src={message.profile} />
                <div>
                  <div>
                    <OnlyNick>{message.sender}</OnlyNick>
                  </div>
                  <OnlyMsg>{message.message}</OnlyMsg>
                </div>
              </MessageBox>
            </div>
          ))}
        </div>
      </ChattingBox>
      <ChattingBar>
        <ChattingInput
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <ChattingSendBtn onClick={sendMessage}>전송</ChattingSendBtn>
      </ChattingBar>
    </div>
  );
}

export default Chat;
