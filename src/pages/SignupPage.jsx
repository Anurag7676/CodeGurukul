import React from 'react'
import LoginHeader from '../components/core/loginpage/LoginHeader'

import SignupForm from '../components/core/signuppage/SignupForm'
import SignupImg from "../assets/Images/login.webp"
const SignupPage = () => {
 
  return (
    <div className='w-full lg:w-[80%] mx-auto mt-6 lg:mt-2 flex  flex-col-reverse lg:flex-row lg:justify-between lg:items-center'>

       <div className='w-[90%] mx-auto lg:mx-0 lg:w-[45%]'>
          <div className='px-3 lg:px-0 my-5 lg:my-0'>
            <LoginHeader
             heading={"Welcome"}
             subheading={"Discover your passions"}
             designTxt={"Be Unstoppable"}
             />
         </div>

           <div className='mt-7'>
             <SignupForm />
           </div>

       </div>
     
       <div className='w-[90%] mx-auto lg:mx-0 lg:w-[40%]'>
            <img 
             className='shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-bl-3xl rounded-tr-3xl '
            src={SignupImg} alt="" />
       </div>
    </div>
  )
}

export default SignupPage