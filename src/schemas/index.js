import * as yup from 'yup';

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const basicSchema = yup.object().shape({
    first_name: yup.string().required("Required"),
    middle_name: yup.string(),
    last_name: yup.string().min(3).required("Required"),
    email: yup.string().email("Please Enter a valid email").matches(emailReg, {message: "Please enter a valid email"}).required("Required"),
    phone_number: yup.string().required("Required"),
    option: yup.string().required("Required")
})