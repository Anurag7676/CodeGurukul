import React from 'react'

const IconBoxTxt = ({icon,heading , subHeading}) => {
  return (
   <>
      <div className='flex gap-3 items-center'>
         
         <div className='w-14 h-14 rounded-full bg-[#FFFFFF] shadow-md flex justify-center items-center'>
             <img src={icon} alt="icon" loading='lazy' />
         </div>
         <div className='flex flex-col '>
            <p className='text-richblack-800 font-semibold'>{heading}</p>
            <p>{subHeading}</p>
         </div>
      </div>
   </>
  )
}

export default IconBoxTxt