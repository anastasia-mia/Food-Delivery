import * as yup from "yup";

export const customerInfoSchema = yup.object().shape({
    name: yup.string().required('Enter name'),
    surName: yup.string().required('Enter surname'),
    phoneNumber: yup.string()
        .matches(/\d+/, 'Incorrect phone number').required('Enter phone number'),
    email: yup.string()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Incorrect email").required('Enter email address'),
    comment: yup.string()
});