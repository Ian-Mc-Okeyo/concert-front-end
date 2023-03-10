import * as yup from 'yup';

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

export const basicSchema = yup.object().shape({
    first_name: yup.string().required("Required"),
    middle_name: yup.string(),
    last_name: yup.string().min(3).required("Required"),
    email: yup.string().email("Please Enter a valid email").matches(emailReg, {message: "Please enter a valid email"}).required("Required"),
    phone_number: yup.string().required("Required").min(10, "Invalid Phone Number").max(10, 'Invalid Phone number').
        test("Check prefix", function () {
            let code = "07";
            let code_2 = "01";
            let num = this.parent["phone_number"];
            // console.log(carriercode, blnum);
            if (code && num) {
                if((num.startsWith(code) || num.startsWith(code_2) ) && containsOnlyNumbers(num)){
                    return true;
                }
                else{
                    return false;
                }
            }
        }),
    option: yup.string().required("Required")
})
