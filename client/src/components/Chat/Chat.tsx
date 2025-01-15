import './Chat.scss';
import {setIsChatDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";
import {useState} from "react";
import useNoScroll from "../../hooks/useNoScroll.ts";
import {AppDispatch} from "../../redux/store.ts";
import {useScrollContentToBottom} from "../../hooks/useScrollContentToBottom.ts";

export const Chat = () => {
    const dispatch = useDispatch<AppDispatch>();
    const chatBodyRef = useScrollContentToBottom<HTMLDivElement>();
    const [message, setMessage] = useState<string>("");
    useNoScroll(true);

    return(
        <div className="chat">
            <div className="chat-header">
                <p>Chat</p>
                <div className="cross" onClick={() => dispatch(setIsChatDisplayed(false))}></div>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                <div className="chat-messages">
                    <div className="chat-message-sender">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
                    <div className="chat-message-receiver">Lorem ipsum dolor sit amet, consectetur adipisicing elit.

                    </div>
                    <div className="chat-message-sender">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
                </div>
            </div>
            <div className="chat-input">
                <textarea
                    placeholder="Write your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="chat-send">
                    {">"}
                </div>
            </div>
        </div>
    )
}