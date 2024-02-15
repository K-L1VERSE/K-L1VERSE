import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

function Chat() {
  const roomId = 1;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:3000/ws/chat");
    const stomp = Stomp.over(socket);

    stomp.connect({}, (frame) => {
      stomp.subscribe(`/topic/chat/room/${roomId}`, (message) => {
        recvMessage(JSON.parse(message.body));
      });
    });

    setStompClient(stomp);

    return () => {
      stomp.disconnect();
    };
  }, [roomId]);

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

  const recvMessage = (recv) => {
    setMessages((messages) => [
      ...messages,
      {
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      },
    ]);
  };

  return (
    <div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <span>
                {message.sender} - {message.message}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default Chat;
