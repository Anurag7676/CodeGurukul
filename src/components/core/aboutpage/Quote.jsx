import React from 'react'
import HighlightText from "../homepage/HighLightText"

const Quote = () => {
  return (
    <div className='lg:text-center lg:text-3xl lg:w-[80%] mx-auto leading-[1.55] px-2'>
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <HighlightText text={"combines technology"}/>
      <span className='text-richblack-500'>
        {" "}
        expertise
      </span>
      , and community to create an 
      <span  className='text-richblack-500'>
      {" "}
        unparalleled educational experience.
      </span>
    </div>
  )
}

export default Quote;