import React from 'react'
import Instructor from "../.././../assets/Images/Instructor.png"
import HighLightText from './HighLightText'
import Button from './Button'
import {AiOutlineArrowRight} from "react-icons/ai";
const InstructorSection = () => {
  return (
    <>
        <div className='flex flex-col-reverse lg:flex-row lg:gap-20 
         px-1 lg:items-center lg:justify-between my-3'>
            <img src={Instructor} 
             loading='lazy'
             alt=""
             className='w-full lg:h-[400px] lg:w-[500px] object-center mx-auto' />
             <div className='lg:w-[50%]'>
                <p className='text-4xl font-bold text-richblack-50'>
                Became an <br/> 
                <HighLightText text={"Instructor"} color={'text-blue-100'} />
                </p>

                <p className='text-richblack-300 mt-3'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                
                <div className='w-fit my-8'>
                <Button 
                children={<p className='flex gap-2 items-center'>Start teaching today <AiOutlineArrowRight/></p>}
                 active={true}
                 linkto={"/signup"}   
                />
                </div>
               
             </div>
        </div>
    </>
  )
}

export default InstructorSection