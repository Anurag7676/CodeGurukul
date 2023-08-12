import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImg from "../../../assets/Images/TimelineImage.png"
import IconBoxTxt from "./IconBoxTxt"

const TimeLineSection = () => {

  const timeline=[
    {
      logo:logo1 ,
      heading:"Leadirship" ,
      subHeading:"Fully committed to the success company"
    },
    {
      logo:logo2 ,
      heading:"Responsibility" ,
      subHeading:"Students will always be our top priority"
    },
    {
      logo:logo3 ,
      heading:"Flexibility",
      subHeading:"The ability to switch is an important skills"
    },
    {
      logo:logo4 ,
      heading: "Solve the problem",
      subHeading:"Code your way to a solution"
    }
  ]

  return (
    <>
        <div className='flex flex-col lg:flex-row px-1 lg:justify-between gap-4 lg:mx-28 my-3'>
           <div className='flex flex-col gap-3 mt-5'>
           {
              timeline.map((item)=>(

                <IconBoxTxt
                  key={item.heading}
                  icon={item.logo}
                  heading={item.heading}
                  subHeading={item.subHeading}
                />
              ))
              
             }
           </div>

           <div className='relative  '>
                
                <div className='lg:h-[400px] absolute bg-grad  z-20'>
                </div>
                <img 
                className='lg:h-[350px] rounded-bl-2xl rounded-tr-2xl -z-10'
                src={TimelineImg} 
                alt="" />

                <div className='absolute -bottom-7 left-[50%] translate-x-[-50%]  flex gap-4 justify-between w-[70%] mx-auto bg-[#014A32] rounded-md'>
                     
                     <div className='flex gap-3 items-center py-3 mx-3'>
                       <p className='text-white font-bold text-2xl'>
                         10
                       </p>
                       <p className='text-caribbeangreen-300 text-sm'>
                        YEARS <br/>
                        OF EXPERIENCE
                       </p>
                     </div>

                     <div className='flex gap-2 items-center py-1 mx-2'>
                       <p className='text-white font-bold text-2xl'>250</p>
                       <p className='text-caribbeangreen-300 text-sm'>TYPES OF <br/> COURSES</p>
                     </div>
                </div>
           </div>
            
        </div>
    </>
  )
}

export default TimeLineSection