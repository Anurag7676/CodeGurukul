import React from 'react'
import Footer from "../components/core/common/Footer"
import {BsFillChatRightFill} from "react-icons/bs";
import {FcGlobe,FcCallback} from "react-icons/fc"
import ContactFrom from "../components/core/common/ContactFrom"
import ReviewSlider from '../components/core/common/ReviewSlider';

const ContactUs = () => {
  return (
    <div>
          
          <div className='w-full sm:w-full lg:w-[80%] mx-auto flex 
          flex-col sm:flex-row pt-8 lg:pt-14 px-2 my-10 gap-y-10 lg:gap-y-0
          '>
           
            {/* LEFT PART */}
            <div className='bg-richblack-500 h-fit p-5 w-[80%] mx-auto sm:w-[30%] flex flex-col gap-y-4 rounded-md '>
                 <div>
                     <p className='text-richblack-5 flex gap-3 text-xl'><BsFillChatRightFill/> Chat on us</p>
                     <p className='text-richblack-200 font-semibold'>Our friendly teams here to help</p>
                     <p className='text-richblack-200 font-semibold'>@code gurukul</p>
                 </div>

                 <div>
                      <p className='flex gap-3 items-center text-richblack-5 text-xl'><FcGlobe/> Visit Us</p>
                      <p className='text-richblack-200 font-semibold'>Come and say Hello , at our office HQ</p>
                      <p className='text-richblack-200 font-semibold'>Address : Bengaluru</p>
                 </div>

                 <div>
                    <p className='text-richblack-5 flex items-center text-xl gap-3'><FcCallback/> Call Us</p>
                    <p className='text-richblack-200 font-semibold'>Mon - Fri 8am to 5pm</p>
                    <p className='text-yellow-100 font-semibold'>+91 8888888888</p>
                 </div>
            </div>
          
            {/* RIGHT PART */}
            <div className='px-4 lg:px-0 mx-auto lg:mx-0 ' >
                   <ContactFrom/>
            </div>
            
          </div>


          {/* REVIEW SLIDER */}
           <div className='my-14 flex flex-col gap-3 px-3'> 
               <p className='text-3xl text-richblack-5 font-semibold text-center'>Review from other learners</p>
                <ReviewSlider/>
           </div>

           <Footer/>
    </div>
  )
}

export default ContactUs;