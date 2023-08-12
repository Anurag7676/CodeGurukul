import React, { useState } from 'react';
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

import Toogler from '../loginpage/Toogler';
import {setSignupData} from "../../../Redux/slice/authSlice"
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../services/operations/authApi';

const SignupForm = () => {
  let data = {
    firstName: "",
    lastName: "",
    email: "",
    country: '91',
    phoneNumber: undefined,
    password: '',
    confirmPassword: "",
    accountType:""
  };
  const [signupData, setSignupdata] = useState(data);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  function formHandler(e) {
    setSignupdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const [showPass,setShowpass]=useState(false);
  const [confirmPassshow, setConfirmPassshow]=useState(false);

  function submitHandler(e){
    e.preventDefault();
    if(signupData.password !==signupData.confirmPassword){
      toast.error("password are not match");
      return ;
    }
      // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    dispatch(sendOtp(signupData.email, navigate))

    setSignupdata({
    firstName: "",
    lastName: "",
    email: "",
    country: '91',
    phoneNumber: undefined,
    password: '',
    confirmPassword: "",
    accountType:""
    })

  }

  //SET USER IN SIGNUP FORM
   function setUser(value)
   {
    signupData.accountType=value;
   }

  return (
    <>
      <form 
      onSubmit={submitHandler}
      className='text-white flex flex-col gap-2 w-full'>

      {/* Toggler */}
       <Toogler  accountType={setUser}/>

        {/* FIRST & LAST NAME */}
        <div className='w-full flex flex-col lg:flex-row gap-3 lg:gap-3 lg:items-center'>

          <label className='flex flex-col gap-2 '>
            <p>First Name <sup>*</sup></p>
            <input
              type="text"
              name='firstName'
              value={signupData.firstName}
              onChange={formHandler}
              className='  bg-[#161D29] outline-none px-[4px] py-[5px] text-[18px]
              rounded-md text-richblack-100 font-bold font-edu-sa'
            />
          </label>

          <label className='flex flex-col gap-1'>
            <p>Last Name <sup>*</sup></p>
            <input
              type="text"
              name='lastName'
              value={signupData.lastName}
              onChange={formHandler}
              className=' bg-[#161D29] gap-3 outline-none px-[4px] py-[5px] text-[18px]
              rounded-md text-richblack-100 font-bold font-edu-sa'
            />
          </label>
        </div>

        {/* EMAIL */}
        <label className='flex flex-col gap-1'>
          <p>Email <sup>*</sup></p>
          <input
            type="email"
            name='email'
            value={signupData.email}
            onChange={formHandler}
            className=' bg-[#161D29] outline-none px-[4px] py-[5px] text-[18px]
              rounded-md text-richblack-100 font-bold font-edu-sa lg:w-[70%]'
          />
        </label>

        {/* PHONE NUMBER */}
        <div className='flex flex-col gap-1'>
          <p>Phone Number<sup>*</sup></p>

          <div className='flex gap-2 lg:w-[70%]'>
            <select
              name="country"
              value={signupData.country}
              onChange={formHandler}
              className=' bg-[#161D29] outline-none px-[4px] py-[5px] text-[18px]
              rounded-md text-richblack-100 font-bold font-edu-sa'
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+880">+880</option>
              <option value="+977">+977</option>
            </select>

            <input
              type="number"
              name='phoneNumber'
              value={signupData.phoneNumber}
              onChange={formHandler}
              className='bg-[#161D29] outline-none px-[4px] py-[5px] text-[18px]
              rounded-md text-richblack-100 font-bold font-edu-sa w-full'
 
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className='flex flex-col lg:flex-row gap-3'>
          <label className='flex flex-col gap-1 w-full'>
            <p>Password <sup>*</sup></p>

            <div className='flex items-center'>
            <input
              type={!showPass ? "password" :"text"}
              name='password'
              value={signupData.password}
              onChange={formHandler}
              className='w-full bg-[#161D29] outline-none px-[4px] py-[5px] text-[18px]
              rounded-md text-richblack-100 font-bold font-edu-sa'
            />
            <div className='cursor-pointer -ml-6'>
                {!showPass? 
                <AiFillEyeInvisible
                   onClick={()=>setShowpass(!showPass)} 
                   size={20} 
                />

                 : <AiFillEye
                    onClick={()=>setShowpass(!showPass)} 
                   size={20}
                 /> 
                 }
            </div>
            </div>
           
          </label>

          <label className='w-full flex flex-col gap-1'>
            <p>Confirm Password <sup>*</sup></p>

            <div className=' flex items-center '>
            <input
              type={!confirmPassshow ? "password" :"text"}
              name='confirmPassword'
              value={signupData.confirmPassword}
              onChange={formHandler}
              className='w-full bg-[#161D29] outline-none px-[4px] py-[5px] text-[18px]
              rounded-md text-richblack-100 font-bold font-edu-sa'
            />
            <div className='cursor-pointer -ml-6'>
                {!confirmPassshow ? <AiFillEyeInvisible
                   onClick={()=>setConfirmPassshow(!confirmPassshow)} 
                   size={20}  
                /> : 

                <AiFillEye
                   onClick={()=>setConfirmPassshow(!confirmPassshow)} 
                   size={20}    
                /> }
            </div>
            </div>
            
          </label>
        </div>

        <div className='my-6 flex justify-center items-center'>
          <button className='bg-yellow-50 w-full lg:w-[50%] py-2 
          rounded-lg text-richblack-700 font-semibold
          transition-all duration-200 hover:scale-95 shadow-2xl
          '>Create Account</button>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
