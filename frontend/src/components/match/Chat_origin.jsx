import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import moment from "moment";

function Chat() {
  const roomId = 1;
  const sender = "test";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:3000/ws/chat");
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
