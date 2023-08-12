import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from "react-router-dom"
import {BsArrowLeft} from "react-icons/bs"
import {BiReset} from "react-icons/bi"

import { signUP } from '../services/operations/authApi';
import { useNavigate } from 'react-router';
import { sendOtp } from '../services/operations/authApi';
const VerifyEmail = () => {
    const {loading,signupData}=useSelector( (state)=>state.auth );
    const [otp, setOtp] = useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();
   
    // check value present in signup data
    useEffect(()=>{
      if(!signUP){
        navigate("/signup")
      }
    })

    //handler function()
    const submitHandler=(e)=>{
      e.preventDefault();
      const{
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
  
      }=signupData;

      //pass all signup value to api
      dispatch(signUP(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }
  return (
    <>
        <div className='w-screen lg:h-screen flex lg:justify-center lg:items-center pt-10 lg:pt-0'>
             {
                loading ? (<div>Loading....</div>)
                :
                (
                    <div className='flex flex-col w-[90%] lg:w-[40%] mx-auto gap-3'>
                      <h1 className='r text-richblack-25 text-2xl text-center lg:text-left'>
                      Verify Email
                      </h1>
                      <p className='text-richblack-200 text-center text-xl lg:text-left '>
                        A verification code has been sent to you. Enter the code below
                      </p>
                           
                           <form onSubmit={submitHandler} className='w-full my-6 lg:my-0'>
                           <div   className=" w-full  mt-3 -ml-1">
                           <OtpInput
                           value={otp}
                            onChange={setOtp}
                            numInputs={6}
                           renderSeparator={<span>-</span>}
                           inputStyle={{
                               width: '2rem',
                               height: '2rem',
                               margin: '0 0.5rem',
                               fontSize: '1.5rem',
                               borderRadius: 4,
                               border: '1px solid rgba(0, 0, 0, 0.3)',
                               paddingLeft: '0.5rem',
                               paddingRight: '0.5rem',
                               }}
                           renderInput={(props) => 
                           <input {...props} 
                            className='px-8 py-4 text-richblack-25 bg-richblack-800'
                            placeholder=''
                           />}
                         />
                           </div>

                            <button className='bg-yellow-50 px-2 
                            transition-all duration-200 focus:scale-95
                            py-2 rounded-md mt-5 w-full lg:w-[58%]'>
                                  Verify Email
                            </button>
                           </form>
                           
                         <div className='flex justify-between items-center mt-5'>
                         <NavLink 
                         className="flex items-center gap-2 text-richblack-300"
                         to='/login'>
                              <BsArrowLeft/> Back to login 
                         </NavLink>
                          <button 
                          className='flex gap-2 items-center text-richblack-300'
                          onClick={()=>dispatch(sendOtp(signupData?.email,navigate))}
                          >
                            <BiReset/>Resend otp 
                          </button>
                         </div>
                    </div>
                )
             }
        </div>
    </>
  )
}

export default VerifyEmail