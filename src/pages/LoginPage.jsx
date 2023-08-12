import React from 'react'
import LoginHeader from '../components/core/loginpage/LoginHeader'
import LoginForm from '../components/core/loginpage/LoginForm'
import loginImg from "../assets/Images/login.webp"

const LoginPage = () => {

  return (
    <>
    <div className='mt-5 w-full lg:w-[75%] mx-auto flex flex-col-reverse lg:flex-row lg:justify-between py-8 lg:py-0'>

            <div className='lg:w-[40%] flex flex-col gap-3 px-5 py-3 mt-6 lg:mt-0'>
              <LoginHeader 
               heading={"Welcome Back"}
               subheading={"Discover your passions"}
               designTxt={"Be Unstoppable"}        
               />
               

               <div className='mt-5 '>
                <LoginForm/>
               </div>

               
               
            </div>

            <div className='w-[70%] mx-auto lg:w-[50%] mt-5 shadow-[inset_-12px_-8px_40px_#46464620]'>
              <img 
                className='shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-bl-3xl rounded-tr-3xl'
                src={loginImg}  alt="/login_image" loading='lazy'                
              />
            </div>
           
           
    </div>
      
    </>
  )
}

export default LoginPage