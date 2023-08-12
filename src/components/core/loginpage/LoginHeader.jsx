import React from 'react'

const LoginHeader = ({heading ,subheading,designTxt}) => {
  return (
    <>
        <div className='flex flex-col gap-2'>
          <p className='text-[#F1F2FF] text-4xl font-inter tracking-wider'>{heading}</p>
          <p className='text-richblack-100'>{subheading}</p>
          <p className='font-edu-sa text-blue-100'>{designTxt}</p>
        </div>
    </>
  )
}

export default LoginHeader