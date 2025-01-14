import './ChatIcon.scss';
import {Icon} from "../../Icons/Icon.tsx";
import {setIsChatDisplayed} from "../../../redux/popUpDisplayingSlice.ts";
import {useDispatch} from "react-redux";

export const ChatIcon = () => {
    const dispatch = useDispatch();

    return (
        <div className="chat-icon" onClick={() => dispatch(setIsChatDisplayed(true))}>
            <Icon id={'message'} stroke={'white'} width={35} height={35} />
        </div>
    )
}