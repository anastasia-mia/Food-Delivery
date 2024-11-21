import './AuthModal.scss';
import {useDispatch} from "react-redux";
import {setIsLoginPopDisplayed, setIsRegisterPopDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {AppDispatch} from "../../redux/store.ts";
import {AuthForm} from "./AuthForm/AuthForm.tsx";
import {useMemo} from "react";
import {resetError} from "../../redux/authSlice.ts";

interface AuthModalProps{
    type: 'login' | 'register'
}

export const AuthModal = ({type}: AuthModalProps) => {
    const dispatch: AppDispatch = useDispatch();

    const isLogin: boolean = useMemo(() => {
        return type === "login";
    }, [type])

    const closePopup = () => {
        isLogin
            ? dispatch(setIsLoginPopDisplayed(false))
            : dispatch(setIsRegisterPopDisplayed(false));
        dispatch(resetError());
    }

    const openRegisterPopup = () => {
        dispatch(setIsRegisterPopDisplayed(true));
        dispatch(setIsLoginPopDisplayed(false));
    }

    return(
        <div className="popUp-background">
            <div className="auth-modal">
                <div className="auth-modal-header">
                    <p className="auth-modal-header-title">
                        {isLogin ? "Login to your account" : "Registration"}
                    </p>
                    <div className="cross" onClick={closePopup}></div>
                </div>
                <div className="auth-modal-body">
                    <AuthForm closePopup={closePopup} isLogin={isLogin}/>
                    {isLogin && (
                        <div className="auth-modal-bottom">
                            <p>Do not have an account?</p>
                            <span onClick={openRegisterPopup}>Register now!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}