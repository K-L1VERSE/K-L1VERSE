import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { useRecoilState } from "recoil";
import Stomp from "webstomp-client";
import moment from "moment";
import {
  ChattingTop,
  ChattingBox,
  ChattingInput,
  ChattingSendBtn,
  ChattingBar,
  MessageBox,
  OnlyMsg,
  SenderImg,
} from "../../styles/MatchStyles/MatchChattingStyle";
import { UserState } from "../../global/UserState";

function Chat() {
  const roomId = 1;
  const sender = "test";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  const { nickname } = useRecoilState(UserState)[0];

  useEffect(() => {
    const socket = new SockJS("http://localhost:8040/ws/chat");
    const stomp = Stomp.over(socket);

    // This effect runs only once when the component mounts
    stomp.connect({}, (frame) => {
      stomp.subscribe(`/topic/chat/room/${roomId}`, (message) => {
        recvMessage(JSON.parse(message.body));
      });
    });

    // Set stompClient state to ensure it persists across re-renders
    setStompClient(stomp);

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      stomp.disconnect();
    };
  }, [roomId]); // Empty dependency array ensures this effect runs only once on mount

  const sendMessage = () => {
    const data = {
      type: "TALK",
      roomId: roomId,
      sender: sender,
      message: message,
      date: moment().format(),
      isUser: sender === "test", // 현재 사용자가 보낸 메시지인지 구분
    };

    setMessages((messages) => [
      ...messages,
      {
        type: data.type,
        sender: data.sender,
        message: data.message,
        isUser: data.isUser,
      },
    ]);

    stompClient.send("/app/chat/message", JSON.stringify(data), []);
    setMessage("");
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
                <div>{/* <SenderImg /> */}</div>
                <SenderImg>Img임</SenderImg>
                <div>
                  <div>
                    {message.sender} ({nickname})
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
