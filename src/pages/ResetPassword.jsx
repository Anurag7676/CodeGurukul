import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//operation interface
import { getPasswordResettoken } from '../services/operations/authApi';

//icons
import {BsArrowLeft} from "react-icons/bs"

const ResetPassword = () => {

    const {loading}=useSelector((state)=>state.auth);
    const [isEmailsent,setIsemailsent]=useState(false);
    const [email,setEmail]=useState("");
    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResettoken(email,setIsemailsent));
    }
  return (
    <>
        <div className='flex  justify-center items-center w-screen h-screen'>
            <div className=' text-richblack-25 w-full lg:w-[40%] mx-auto px-3 lg:px-0'>
            {
                loading ? (<div> Loading....</div>)
                :
                (
            <div className='flex flex-col '>
                  
                <h1 className='text-2xl font-inter font-bold text-richblack-25 tracking-wider'>
                    { !isEmailsent ? ("Rseet your password") : "Check email"}
                </h1>

                <p className='text-base text-richblack-400 mt-3 pr-16'>
                    {
                        !isEmailsent ? 
                        ("Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery")
                        :
                        (
                           `We have sent the reset email to ${<br/>} ${email}`
                        )
                    }
                </p>
                <form onSubmit={submitHandler} 
                className='mt-4 flex flex-col'
                >
                    {
                        !isEmailsent &&
                        <input 
                        className='text-richblack-50 outline-none border-none 
                         px-2  py-2 rounded-md lg:w-[60%]
                         bg-richblack-700'
                        required
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder='Enter your mail'
                         />
                    }
                    <button type='submit' 
                    className='bg-yellow-50 py-2 px-2 lg:w-[60%] mt-6
                    rounded-lg text-richblack-500'>
                        {
                            !isEmailsent ? "Reset Password" : "Resend Mail"
                        }
                    </button>
                </form>

                <div className='mt-3'>
                  <Link 
                  className='flex items-center gap-2 '
                  to="/login">
                    <BsArrowLeft/> Back to log in
                  </Link>
                </div>

            </div>
                )
            }
            </div>
        </div>
    </>
  )
}

export default ResetPassword