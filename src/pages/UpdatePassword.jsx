import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {useNavigate} from 'react-router-dom'

//icon
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"

//operation interface for api call
import { updatePassword } from '../services/operations/authApi';

const UpdatePassword = () => {

    const [passwordData,setPassdata]=useState({
        password:"",
        confirmpassword:""
    });
    const[showPass,setShowpass]=useState(false);
    const[showConfirmpass,setConfirmpass]=useState(false);
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const location=useLocation();
    const{loading}=useSelector((state)=>state.auth);
   
    const token=location.pathname.split('/').at(-1);

    const fromHandler=(e)=>{
        setPassdata((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(updatePassword(passwordData.password,passwordData.confirmpassword,token));
        navigate("/login")
    }

  return (
    <div className='w-screen h-screen justify-center items-center'>
        {
            loading ? 
            (  
                <div className='text-2xl text-white w-screen h-screen flex justify-center items-center'>
                 Loading... 
                </div>
            )
            :
            (
                <div 
                className='flex flex-col gap-3
                 text-richblack-25 my-auto 
                font-inter text-lg lg:w-[40%] mx-auto mt-10 lg:mt-[150px] px-3'
                >
                  <h1 className='text-3xl text-center lg:text-left text-richblack-25 font-bold font-inter'> Choose new password</h1>
                  <p 
                   className='text-base text-center lg:text-left  text-richblack-500 lg:pr-[200px] my-2'
                  >Almost done. Enter your new password and youre all set.</p>

                  <form onSubmit={submitHandler}>

                    <label className='text-richblack-200 '>
                        <p className='my-1'>New Password <sup>*</sup></p>
                       
                        <div className='w-full flex items-center'>
                        <input 
                          name='password'
                          value={passwordData.password}
                          type={!showPass ? "password" :"text"}
                          onChange={fromHandler}
                          className='w-full  lg:w-[60%] px-2 py-[0.3rem] text-richblack-25 rounded-lg
                           bg-richblack-700 outline-none border-none cursor-pointer'
                        />
                            <span className='-ml-6'
                             onClick={()=>setShowpass(!showPass)}
                             >
                                {
                                    !showPass ? <AiFillEyeInvisible className='cursor-pointer' size={20}/> : <AiFillEye size={20}/>
                                }
                            </span>
                        </div>
                    </label>

                    <label >
                        <p className='mt-3'>Confirm new password <sup>*</sup></p>
                        <div className='flex items-center'>
                        
                        <input 
                          name='confirmpassword'
                          value={passwordData.confirmpassword}
                          type={!showConfirmpass ? "password" : "text"}
                          onChange={fromHandler}
                          className='w-full lg:w-[60%] px-2 py-[0.3rem] text-richblack-25 rounded-lg
                           bg-richblack-700 outline-none border-none cursor-pointer'
                        />
                            <span
                            className='-ml-6'
                            onClick={()=>setConfirmpass(!showConfirmpass)}
                            >
                                {
                                    !showConfirmpass ? <AiFillEyeInvisible size={20}/> : <AiFillEye size={20}/>
                                }
                            </span>
                        </div>
                    </label>

                    <div>
                        <button 
                        className='bg-yellow-50 py-[0.33rem] px-5 rounded-lg mt-4 text-richblack-800 font-semibold'
                        type='submit'>
                            Reset Password
                        </button>
                    </div>
                  </form>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword