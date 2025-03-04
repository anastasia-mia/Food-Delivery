import './AdminChat.scss';
import {Link, useLocation, useParams} from "react-router-dom";
import {useScrollContentToBottom} from "../../../hooks/useScrollContentToBottom.ts";
import {useEffect, useState} from "react";
import {formatDate} from "../../../utils/formatDate.ts";
import {useChat} from "../../../hooks/useChat.ts";
import {handleEnterPress} from "../../../utils/handleEnterPress.ts";

export const AdminChat = () => {
    const {id} = useParams();
    const {messages, sendMessage, readMessages, requestedChatId} = useChat(Number(id));
    const chatBodyRef = useScrollContentToBottom<HTMLDivElement>(messages);
    const [message, setMessage] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        readMessages('admin')
    }, [requestedChatId]);

    const handleMessageSend = () => {
        if (message.trim() === "") return;
        sendMessage(message.trim(), 'admin');
        setMessage('');
    }

    return(
        <div className="admin-chat">
            <Link to="/admin/messages" className="admin-chat-back">
                <span>{"<  back to messages"}</span>
            </Link>
            <p className="admin-chat-name">{location.state.name}</p>
            <div className="admin-chat-body" ref={chatBodyRef}>
                <div className="admin-chat-content">
                    {messages.map((message) => (
                        <div className={`admin-chat-message-${message.sender_id === 'admin' ? 'admin' : 'client'}`}
                             key={message.id}
                        >
                            <p>{message.message}</p>
                            <span>{formatDate(message.created_at)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="admin-chat-input">
                <textarea
                    placeholder="Write the message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(event) => handleEnterPress(event, handleMessageSend)}
                />
                <button className="admin-chat-send" onClick={handleMessageSend}>Send</button>
            </div>
        </div>
    )
}