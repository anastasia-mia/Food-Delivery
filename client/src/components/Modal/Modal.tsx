import './Modal.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {Link} from "react-router-dom";
import {setIsDisplayedModal} from "../../redux/modalSlice.ts";
import {setIsLoginPopDisplayed} from "../../redux/popUpDisplayingSlice.ts";

export const Modal = () => {
    const {text, link, buttonText} = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch();

    const closePopUp = () => {
        dispatch(setIsDisplayedModal(false));
    }

    const openLoginPopup = () => {
        dispatch(setIsLoginPopDisplayed(true));
        closePopUp()
    }

    return(
        <div className="popUp-background">
            <div className="modal">
                <div className="modal-header">
                    <div className="cross" onClick={closePopUp}></div>
                </div>
                <div className="modal-body">
                    <p className="modal-text">{text}</p>
                    <Link to={link}>
                        <button className="modal-button"
                                onClick={buttonText === "Log in" ? openLoginPopup : closePopUp}>
                            {buttonText}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}