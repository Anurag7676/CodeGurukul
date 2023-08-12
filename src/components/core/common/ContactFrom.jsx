import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"

import countrycode from "../../../data/countrycode.json"

const ContactUsForm = () => {

  const[loading, setLoading]=useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
      
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

    <div className='flex flex-col lg:gap-10 gap-3'>
            <div className='flex flex-col lg:flex-row gap-5'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label className=' text-richblack-200' htmlFor='firstname'>
                     First Name
                    </label>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        className='text-richblack-25 bg-[#161D29] px-2 py-2 rounded-md outline-none'
                        {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname' className='text-richblack-200'>Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        className='text-richblack-25 bg-[#161D29] px-2 py-2 rounded-md outline-none'
                        {...register("lastname")}
                    />
                    
                </div>

            </div>


            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email' className='text-richblack-200'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className='text-richblack-25 bg-[#161D29] px-2 py-2 rounded-md outline-none'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col'>

                <label htmlFor='phonenumber' className='text-richblack-200'>Phone Number</label>

                <div className='flex flex-row gap-2'>
                    {/* dropdown */}
                   
                        <select
                            name='dropdown'
                            id="dropdown"
                            className='lg:w-[150px] w-[80px] text-richblack-25 bg-[#161D29] px-2 py-2 rounded-md outline-none'
                            {...register("countrycode", {required:true})}
                        >
                            {
                              countrycode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                        
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className=' text-richblack-25 bg-[#161D29] px-2 py-2 rounded-md outline-none lg:w-[calc(100%-150px)]'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                  
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message' className='text-richblack-200'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                   className=' text-richblack-25 bg-[#161D29] px-2 py-2 rounded-md outline-none'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            PLease enter your message.
                        </span>
                    )
                }
            </div>
                
            <button type='submit'
              className='rounded-md py-2 transition-all 
              duration-200 hover:scale-95 bg-yellow-50 text-center 
              px-6 text-[16px] font-bold text-black'>
                    Send Message
            </button>
    </div>

    </form>
  )
}

export default ContactUsForm
