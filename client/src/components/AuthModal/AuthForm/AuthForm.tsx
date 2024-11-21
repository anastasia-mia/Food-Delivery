import './AuthForm.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store.ts";
import {FieldErrors, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../../validations/loginSchema.ts";
import {IUserLogin, IUserRegister} from "../../../interfaces/userInterfaces.ts";
import {checkSession, loginUser, registerUser} from "../../../redux/authSlice.ts";
import {registrationSchema} from "../../../validations/registrationSchema.ts";

interface AuthFormProps{
    closePopup: () => void;
    isLogin: boolean;
}

export const AuthForm = ({closePopup, isLogin}: AuthFormProps) => {
    const dispatch: AppDispatch = useDispatch();
    const {error} = useSelector((state: RootState) => state.auth);

    const {register, handleSubmit, formState: {errors}} = useForm<IUserLogin | IUserRegister>({
        resolver: yupResolver(isLogin ? loginSchema : registrationSchema),
    });

    const handleSubmitForm = (data: IUserLogin | IUserRegister) => {
        if(isLogin){
            dispatch(loginUser(data as IUserLogin)).unwrap().then(() => {
                closePopup()
                dispatch(checkSession());
            })
        }else{
            dispatch(registerUser(data as IUserRegister)).unwrap().then(() => {
                closePopup()
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div>
                {!isLogin && (
                    <label className="auth-form-body-label">Name*
                        <input type="text"
                               placeholder="Name"
                               className="auth-form-body-input"
                               {...register("name")}
                        />
                        <p className="auth-form-body-error">
                            {!isLogin && (errors as FieldErrors<IUserRegister>).name?.message}
                        </p>
                    </label>
                )}
                <label className="auth-form-body-label">Email*
                    <input type="text"
                           placeholder="Email"
                           className="auth-form-body-input"
                           {...register("email")}
                    />
                    <p className="auth-form-body-error">{errors.email?.message}</p>
                </label>
                <label className="auth-form-body-label">Password*
                    <input type="password"
                           placeholder="Name"
                           className="auth-form-body-input"
                           {...register("password")}
                    />
                    <p className="auth-form-body-error">{errors.password?.message}</p>
                </label>
                {!isLogin && (
                    <label className="auth-form-body-label">Confirm password*
                        <input type="password"
                               placeholder="Confirm password"
                               className="auth-form-body-input"
                               {...register("confirmPassword")}
                        />
                        <p className="auth-form-body-error">
                            {!isLogin && (errors as FieldErrors<IUserRegister>).confirmPassword?.message}
                        </p>
                    </label>
                )}
            </div>
            {error && <p className="auth-form-submit-error">{error}</p>}
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
    )
}