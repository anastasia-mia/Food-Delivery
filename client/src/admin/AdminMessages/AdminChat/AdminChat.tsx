import './AdminChat.scss';
import {Link} from "react-router-dom";
import {useScrollContentToBottom} from "../../../hooks/useScrollContentToBottom.ts";

export const AdminChat = () => {
    const chatBodyRef = useScrollContentToBottom<HTMLDivElement>();

    return(
        <div className="admin-chat">
            <Link to="/admin/messages" className="admin-chat-back">
                <span>{"<  back to messages"}</span>
            </Link>
            <p className="admin-chat-name">BBBBB (user ID: 23)</p>
            <div className="admin-chat-body" ref={chatBodyRef}>
                <div className="admin-chat-content">
                    <div className="admin-chat-message-client">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ea earum eos eum eveniet harum id
                        ipsam iure magnam odio officiis perferendis, perspiciatis quas sed sit soluta veniam vitae
                        voluptas.
                    </div>
                    <div className="admin-chat-message-admin">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                </div>
            </div>
            <div className="admin-chat-input">
                <textarea
                    placeholder="Write the message"
                />
                <div className="admin-chat-send">Send</div>
            </div>
        </div>
    )
}