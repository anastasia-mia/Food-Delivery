import * as yup from "yup";

export const registrationSchema = yup.object().shape({
    name: yup.string().required('Enter name'),
    email: yup.string()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Incorrect email").required('Enter email address'),
    password: yup.string().required('Enter password'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm your password')
});