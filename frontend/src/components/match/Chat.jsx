import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import Stomp from "webstomp-client";
import moment from "moment";
import axios from "../../api/axios";
import {
  ChattingTop,
  ChattingBox,
  ChattingInput,
  ChattingSendBtn,
  ChattingBar,
  MessageBox,
  OnlyNick,
  OnlyMsg,
  MsgTime,
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

  const handleScroll = () => {
    if (chatBox.current) {
      const gap = 83.984;
      const scrollTotalHeight = (messages.length - 4) * gap;
      const currentMessage = Math.ceil(
        (scrollTotalHeight - chatBox.current.scrollTop) / gap,
      );
      console.log("currentMessage", currentMessage);

      if (currentMessage >= 1) {
        const timeMinutesGap = moment
          .duration(
            moment().diff(
              moment(messages[messages.length - 4 - currentMessage].date),
            ),
          )
          .asMinutes();
        if (timeMinutesGap > 10) {
          // 여기서 처리
          alert("이전 메시지를 불러옵니다.");
        }
      }
    }
  };

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatBox.current) {
        chatBox.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
                  <MsgTime>
                    {moment(message.date, "YYYY-MM-DD HH:mm:ss").format(
                      "MM-DD hh:mm",
                    )}
                  </MsgTime>
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
