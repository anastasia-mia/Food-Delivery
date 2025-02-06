import './Chat.scss';
import {setIsChatDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import useNoScroll from "../../hooks/useNoScroll.ts";
import {AppDispatch} from "../../redux/store.ts";
import {useScrollContentToBottom} from "../../hooks/useScrollContentToBottom.ts";
import {useChat} from "../../hooks/useChat.ts";
import {IMessage} from "../../interfaces/chatInterfaces.ts";
import {handleEnterPress} from "../../utils/handleEnterPress.ts";

export const Chat = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {messages, sendMessage, requestedChatId, clientId, readMessages} = useChat();
    const chatBodyRef = useScrollContentToBottom<HTMLDivElement>(messages);
    const [message, setMessage] = useState<string>("");
    useNoScroll(true);

    useEffect(() => {
        readMessages()
    }, [requestedChatId, clientId]);

    const handleMessageSend = () => {
        if (message.trim() === "") return;
        sendMessage(message.trim());
        setMessage('');
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <p>Chat</p>
                <div className="cross" onClick={() => dispatch(setIsChatDisplayed(false))}></div>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                {messages.length > 0 ?
                    <div className="chat-messages">
                        {messages.map((message: IMessage) => (
                            <div className={`chat-message-${message.sender_id === "admin" ? 'receiver' : 'sender'}`}
                                 key={message.id}>
                                <p>{message.message}</p>
                            </div>
                        ))}
                    </div>
                    : <p className="chat-text">You don't have any messages</p>
                }
            </div>
            <div className="chat-input">
                <textarea
                    placeholder="Write your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(event) => handleEnterPress(event, handleMessageSend)}
                />
                <div className="chat-send" onClick={handleMessageSend}>
                    {">"}
                </div>
            </div>
        </div>
    )
}