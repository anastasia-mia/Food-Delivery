import './ChatIcon.scss';
import {Icon} from "../../Icons/Icon.tsx";
import {setIsChatDisplayed} from "../../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";
import {useChat} from "../../../hooks/useChat.ts";
import {useEffect, useState} from "react";

export const ChatIcon = () => {
    const dispatch = useDispatch();
    const [showedNotifications, setShowedNotifications] = useState<boolean>(false);
    const {messages} = useChat();

    useEffect(() => {
        if(messages.length > 0){
            const unreadExists = messages.some((msg) => msg.sender_id === 'admin' && msg.is_read === 0);
            setShowedNotifications(unreadExists);
        }
    }, [messages]);

    return (
        <div className="chat-icon" onClick={() => dispatch(setIsChatDisplayed(true))}>
            <Icon id={'message'} stroke={'white'} width={35} height={35}/>
            {showedNotifications && <div className="chat-icon-notification"></div>}
        </div>
    )
}