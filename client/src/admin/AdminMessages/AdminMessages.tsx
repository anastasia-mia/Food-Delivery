import './AdminMessages.scss';
import {Pagination} from "../../components/Pagination/Pagination.tsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../../axiosConfig.ts";
import {IChat} from "../../interfaces/chatInterfaces.ts";
import {formatDate} from "../../utils/formatDate.ts";


export const AdminMessages = () => {
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [chats, setChats] = useState<IChat[]>([]);

    useEffect(() => {
        axiosInstance.get("/chats", {params: {page}})
            .then((res) => {
                setChats(res.data.chats);
                setHasNextPage(res.data.hasNextPage);
            })
    }, [page]);

    return (
        <div className="admin-messages">
            <div className="admin-messages-content">
                {chats.map((chat: IChat) => (
                    <Link to={`/admin/messages/${chat.id}`} state={{name: chat.name}} key={chat.id}>
                        <div className={`admin-messages-message 
                            ${chat.unreadCount ? 'admin-messages-message-unread' : ''}`}

                        >
                            <p className="admin-messages-message-id">{chat.id}</p>
                            <p className="admin-messages-message-name">{chat.name}</p>
                            <p className="admin-messages-message-text">{chat.lastMessage}</p>
                            <p className="admin-messages-message-date">{formatDate(chat.updatedAt)}</p>
                            {chat.unreadCount > 0 &&
                                <span className="admin-messages-message-quantity">{chat.unreadCount}</span>
                            }
                        </div>
                    </Link>
                ))}
            </div>
            <Pagination page={page} hasNextPage={hasNextPage} setNewPage={setPage}/>
        </div>
    )
}