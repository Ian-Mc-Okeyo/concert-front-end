import React from 'react';
import "./home.css";
import axios from "axios";
import {useState} from 'react'
import { useFormik } from 'formik'
import { basicSchema } from '../schemas'
import ReactLoading from 'react-loading';
import {Link} from 'react-router-dom';
import emailjs from '@emailjs/browser';

const CreateAttendee = () => {

    const baseurl = 'https://api.tickets.jkusdachurch.org/concert/'

    const [isLoading, setIsLoading] = useState(false);
    const [sendTransaction, setSendTransaction] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const [transactionID, setTransactionID] = useState("");
    const [transactionStatus, setTransactionStatus] = useState(1);
    const [ticketID, setTicketID] = useState("");

    const onSubmit = async (values, actions) =>{
        setIsLoading(true);
        //reset form: actions.resetForm()
        setTimeout(activateModal, 2000)
    }

    const requestPayment = async () => {
        setSendTransaction(true)
        //sending the stk push request
        const phoneNu = values.phone_number
        const updated_num = "+254" + phoneNu[1]+ phoneNu[2]+ phoneNu[3]+ phoneNu[4]+ phoneNu[5]+ phoneNu[6]+ phoneNu[7]+ phoneNu[8]+ phoneNu[9]
        axios.post( baseurl+"checkout/", {
            phone_number: updated_num,
            amount: Number(values.option),
            reference: "concert",
            description: "concert"
        }).then((response)=>{
            console.log(response.data);
            console.log(response.data.ResponseCode)
            //reset the form
            setTransactionID(response.data.CheckoutRequestID)
            //checking the status of the payment
            delay(response)
        })
        
    }

    const delay = (r) => {
        setTimeout(()=>{
            checkPaymentStatus(r.data.billref)
        }, 32000)
    }

    const checkPaymentStatus = (id) => {
        axios.get( baseurl + 'check-transaction/'+id).then((response) => {
            setTransactionStatus(response.data.status)
            if(!response.data.status){

                //setting the ticket type
                var ticket_type = 'Advance'
                if(values.option == '800'){
                    ticket_type = 'Mega'
                }else if(values.option == '700'){
                    ticket_type = 'Couple';
                }else if(values.option == '1650'){
                    ticket_type = 'Group';
                }
                console.log(ticket_type);
                var middle_name = 'null-x';
                if(values.middle_name){
                    middle_name = values.middle_name;
                }
                console.log(middle_name);
                
                axios.post(baseurl + 'add-attendee/', {
                    phone_number: values.phone_number,
                    first_name: values.first_name,
                    middle_name: middle_name,
                    last_name: values.last_name,
                    email: values.email,
                    ticket_type: ticket_type,
                    transaction_no: id,
                    amount: values.option
                }).then((response)=>{
                    setTicketID(response.data.ticket_id)

                    //sending the ticket_id via email
                    var templateParams = {
                        ticket_id: response.data.ticket_id,
                        first_name: values.first_name,
                        email: values.email   
                    }

                    emailjs.send('service_5yfw0xh', 'template_tc1b9hf', templateParams, 'Y_h02AB2ElujhmJ37')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                    
                })
            }
            setSendTransaction(false)
            setFeedback(true)
        })
    }

    const activateModal = ()=>{
        setIsLoading(false);
        document.getElementById('modal-btn').click();
    }

    const modalClose = () =>{
        setSendTransaction(false);
        setFeedback(false)
    }

    const Feedback = () => {
        if(!feedback){
            return ""
        }else{
            if(transactionStatus){
                return(
                    <div style={{textAlign: 'center'}}>
                        <hr />
                        <h5 style={{color: 'red'}}>Transaction is Incomplete</h5>
                        <button type="submit" className="btn btn-primary" onClick={requestPayment} disabled={sendTransaction}>Try Again</button>
                    </div>
                )
            }else{
                
                return(
                    <div style={{textAlign: 'center'}}>
                        <hr />
                        <h5 style={{color: 'blue'}}>Transaction Complete</h5>
                        <h5 style={{color: 'green'}}>Ticket No: {ticketID}</h5>
                        <b>Ticekt Number has been sent to your email. Kindly Remember to save your Ticket Number.</b>
                        <br/>
                        <button
                             onClick = {()=>window.location.reload(true)}
                             className='btn btn-primary'>

                            <Link to ='/' className='btn btn-primary'>Exit</Link>
                        </button>
                    </div>
                )
            }
        }
    }

    const {values, errors,  handleBlur, touched, isSubmitting, handleChange, handleSubmit } = useFormik({
        initialValues: { 
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            option: ''
        },
        validationSchema: basicSchema,
        onSubmit
    })

    return(
        <>
            <div className='bg' id='fullpage'></div>
            <div className='container row' style={{textAlign: 'center'}}>
                {/* <h1 style={{textAlign: 'center'}}>BRIGHTEN YOUR CORNER CONCERT</h1> */}
            <form className="col-md-8 content" onSubmit={handleSubmit} id='fom'>
                {/* <h1>BUY YOUR TICKET</h1> */}
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01" className='form-control-lg'>First name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="validationCustom01" 
                            placeholder="First name" 
                            value={values.first_name} 
                            name='first_name' 
                            onChange={handleChange}
                            onBlur = {handleBlur}
                            style = {errors.first_name && touched.first_name ? {borderColor:"#fc8181"}:{}}/>
                            { errors.first_name && touched.first_name && <p className='error'>{errors.first_name}</p>}
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom02" className='form-control-lg'>Middle name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="validationCustom02" 
                            placeholder="Middle name" 
                            value={values.middle_name} 
                            name='middle_name' 
                            onChange={handleChange} 
                            onBlur = {handleBlur}
                            style = {errors.middle_name && touched.middle_name ? {borderColor:"#fc8181"}:{}}/>
                            { errors.middle_name && touched.middle_name && <p className='error'>{errors.middle_name}</p>}
                
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom02" className='form-control-lg'>Last name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="validationCustom02" 
                            placeholder="Last name" 
                            value={values.last_name} 
                            name='last_name' 
                            onChange={handleChange}
                            onBlur = {handleBlur}
                            style = {errors.last_name && touched.last_name ? {borderColor:"#fc8181"}:{}}/>
                            { errors.last_name && touched.last_name && <p className='error'>{errors.last_name}</p>}
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="validationCustom02" className='form-control-lg'>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="validationCustom02" 
                            placeholder="Email" 
                            value={values.email} 
                            name='email' 
                            onChange={handleChange}
                            onBlur = {handleBlur}
                            style = {errors.email && touched.email ? {borderColor:"#fc8181"}:{}}/>
                            { errors.email && touched.email && <p className='error'>{errors.email}</p>}
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="validationCustom02" className='form-control-lg'>Phone Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="validationCustom02" 
                            placeholder="M-PESA Number. 07..." 
                            value={values.phone_number} 
                            name='phone_number' 
                            onChange={handleChange}
                            onBlur = {handleBlur}
                            style = {errors.phone_number && touched.phone_name? {borderColor:"#fc8181"}:{}}/>
                            { errors.phone_number && touched.phone_number && <p className='error'>{errors.phone_number}</p>}
                    </div>
                    <div className='form-group col-md-4 mb-3'>
                        <label htmlFor='validationCustom06' className='form-control-lg'>Type of payment</label>
                        <select 
                            className='form-select'
                            onChange={handleChange}
                            onBlur = {handleBlur}
                            value={values.option}
                            name='option'
                            style = {errors.phone_number && touched.phone_name? {borderColor:"#fc8181"}:{}}
                        >
                            <option value="" selected>Select payment option</option>
                            <option value="400" selected>Individual-Ksh 400</option>
                            <option value="700">Couple-Ksh 700</option>
                            <option value="1650">Group of 5-Ksh 1650</option>
                            <option value="800">Mega-Ksh 800</option>
                        </select>
                        { errors.option && touched.option && <p className='error'>{errors.option}</p>}
                    </div>
                </div>
                <button className="" type="submit" disabled={isSubmitting} style={{borderRadius: '0.5rem'}}> {isLoading ? <ReactLoading type="bars" color="white" height={20} width={20} />: "Proceed to payment"}</button>
                <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id='modal-btn' style={{display: 'none'}}></button>
                <h4>Contact 0725927128 or 0796417598 for any issues</h4>
            </form>
        </div>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">CONFIRMATION</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={modalClose} disabled={sendTransaction}></button>
                        </div>
                        <div className="modal-body">
                            <h4>Please Confirm Details Before Payment</h4>
                            <hr/>
                            <div style={{color: 'hsl(209, 61%, 16%)'}}>
                                <h5>Name: {values.first_name.toUpperCase()} {values.middle_name.toUpperCase()} {values.last_name.toUpperCase()}</h5>
                                <h5>Email: {values.email}</h5>
                                <h5>Payment Option: {values.option}</h5>
                                <h5><b>M-PESA No: {values.phone_number} *</b></h5>
                                {sendTransaction ?
                                    <div style={{textAlign: 'center'}}>
                                        <hr />
                                        <h5>An Mpesa Push prompt has been sent to your phone. Kindly don't exit this page, wait for the ticket number...</h5>
                                        <button className='btn btn-light' style={{border: 'none', background: 'transparent'}}>
                                            <ReactLoading type="bars" color="orange" height={60} width={60} />
                                        </button>
                                    </div>
                                    : 
                                <Feedback/>
                                }
                            </div>
                        </div> 
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" disabled={sendTransaction}>Change details</button>
                            <button type="submit" className="" onClick={requestPayment} disabled={sendTransaction} style={{borderRadius: '0.5rem'}}>PAY</button>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default CreateAttendee
