import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Incorrect email").required('Enter email address'),
    password: yup.string().required('Enter password')
});