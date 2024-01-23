import axios from "../../api/authAxios";
import {useState, useEffect} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import moment from 'moment';

function Notification() {

    const email = "huni19541@gmail.com";
    const domain = "google";
    const uri = "http://localhost:3000/login";
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);


    useEffect(() => {
        const socket = new SockJS('http://localhost:8010/ws/notification');
        const stomp = Stomp.over(socket);

        // This effect runs only once when the component mounts
        stomp.connect({}, (frame) => {
            stomp.subscribe(`/topic/notification/${email}:${domain}`, (message) => {
                console.log(message);
                recvMessage(JSON.parse(message.body));
            });
        });

        // Set stompClient state to ensure it persists across re-renders
        setStompClient(stomp);

        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
            stomp.disconnect();
        };
    }, [email, domain]); // Empty dependency array ensures this effect runs only once on mount

    const sendMessage = () => {
        const data = {
            type: 'GOAL',
            userId: 1,
            message: message,
            uri: uri,
            date: moment().format()
        };

        stompClient.send("/app/notification/message", JSON.stringify(data), []);
        setMessage('');
    };

    const recvMessage = (recv) => {
        setMessages(messages => [...messages, { 
            type: recv.type, 
            email: recv.email, 
            domain: recv.domain, 
            message: recv.message
         }]);
    };


    return (
        <div>
            <div>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>
                            <span>{message.type} - {message.message}</span>
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

export default Notification;