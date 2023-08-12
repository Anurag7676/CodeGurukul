import React from 'react'
import HighLightText from './HighLightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import Button from './Button'

const LearningLanguageSection = () => {
  return (
    <>
        <div className='flex flex-col gap-3 mt-14 '>

           <p className='lg:text-4xl text-3xl font-bold lg:text-center px-1'>
             Your swiss knife for {" "}
              <HighLightText 
              color={"text-blue-100"}
               text={"lerning any language"} />
           </p>

           <p className='lg:text-center px-1 lg:px-52'>
           Using spin making learning multiple languages easy. 
           with 20+ languages realistic voice-over,
            progress tracking, 
           custom schedule and more
           </p>

           <div className='flex flex-col lg:flex-row w-full mx-auto mt-5'>
               
               <img className='w-full lg:w-[33%] -mr-6 lg:-mr-24 lg:ml-24' 
                src={know_your_progress} 
                alt="" loading='lazy' />

               <img 
               className='w-full lg:w-[33%] ' 
               src={Compare_with_others} 
               alt="" loading='lazy' />
               <img className='w-full lg:w-[33%] -ml-6 lg:-ml-24' src={Plan_your_lessons} alt="" loading='lazy' />
           </div>
            
            <div className='w-fit mx-auto mt-10 mb-2'>
              <Button children={"Learn more"} active={true} linkto={"/login"}/>
            </div>
        </div>
    </>
  )
}

export default LearningLanguageSection