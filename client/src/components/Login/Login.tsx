import './Login.scss';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../validations/loginSchema.ts";
import {useDispatch} from "react-redux";
import {setIsLoginPopDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import {useState} from "react";
import axios from "axios";
import {IUserLogin} from "../../models/interfaces/userInterfaces.ts";

export const Login = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string>("");

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
    });

    const handleLogin = (data: IUserLogin) => {
        axios.post('http://localhost:3001/api/login', data)
            .then(() => closePopup())
            .catch(err => setError(err.response.data));
    }

    const closePopup = () => {
        dispatch(setIsLoginPopDisplayed(false))
    }

    return(
        <div className="popUp-background">
            <div className="login">
                <div className="login-header">
                    <p className="login-header-title">Login to your account</p>
                    <div className="cross" onClick={closePopup}></div>
                </div>
                <div className="login-body">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <label className="login-body-label">Email*
                                <input type="text"
                                       placeholder="Email"
                                       className="login-body-input"
                                       {...register("email")}
                                />
                                <p className="login-body-error">{errors.email?.message}</p>
                            </label>
                            <label className="login-body-label">Password*
                                <input type="password"
                                       placeholder="Name"
                                       className="login-body-input"
                                       {...register("password")}
                                />
                                <p className="login-body-error">{errors.password?.message}</p>
                            </label>
                        </div>
                        {error && <p className="login-submit-error">{error}</p>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}