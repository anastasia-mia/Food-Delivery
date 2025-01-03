import './Statuses.scss';
import {ArrowDown} from "../../../components/Icon/ArrowDown.tsx";
import {useDropDownVisibility} from "../../../hooks/useDropDownVisibility.ts";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import axios from "axios";
import {IStatus} from "../../../interfaces/orderInterfaces.ts";

interface statusesParams{
    status: {
        statusId: number,
        statusName: string
    },
    orderId: number,
}

export const Statuses = ({status, orderId}: statusesParams) => {
    const {isDropDownOpen, toggleDropDownOpen} = useDropDownVisibility();
    const statuses: IStatus[]  = useSelector((state: RootState) => state.statuses);
    const [currentStatus, setCurrentStatus] = useState<IStatus>({id: status.statusId, name: status.statusName});
    const [updatingMessage, setUpdatingMessage] = useState<string>('');

    const changeStatus = (status: IStatus) => {
        axios.put(`http://localhost:3001/api/changeOrderStatus/${orderId}`,
            {statusId: status.id},
            {withCredentials: true})
            .then((res) => {
                setUpdatingMessage(res.data.message);
                setCurrentStatus({id: status.id, name: status.name});
                toggleDropDownOpen();
            })
    }

    return(
        <div className="statuses">
            <div className={`statuses-current statuses-${currentStatus.id}`} onClick={toggleDropDownOpen}>
                <p>{currentStatus.name}</p>
                <ArrowDown isOptionsOpen={isDropDownOpen}/>
            </div>
            {isDropDownOpen &&
                <div className="statuses-items">
                    {statuses.filter(el => el.id !== status.statusId).map((el) => (
                        <p onClick={() => changeStatus(el)}
                           key={el.id}>
                            {el.name}
                        </p>
                    ))}
                </div>
            }
            {updatingMessage && <div className="statuses-message">{updatingMessage}</div>}
        </div>
    )
}