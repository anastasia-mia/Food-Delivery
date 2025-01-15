import './AdminMessages.scss';
import {Pagination} from "../../components/Pagination/Pagination.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";


export const AdminMessages = () => {
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    return(
        <div className="admin-messages">
            <div className="admin-messages-content">
                <Link to="/admin/messages/1">
                    <div className="admin-messages-message admin-messages-message-unread">
                        <p className="admin-messages-message-id">1</p>
                        <p className="admin-messages-message-name">Name Name</p>
                        <p className="admin-messages-message-text">Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                   elit.
                                                                   Consequatur eum maxime reiciendis sit.</p>
                        <p className="admin-messages-message-date">26.04.2025</p>
                        <span className="admin-messages-message-quantity">2</span>
                    </div>
                </Link>
            </div>
            <Pagination page={page} hasNextPage={hasNextPage} setNewPage={setPage} />
        </div>
    )
}