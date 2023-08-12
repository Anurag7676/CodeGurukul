import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import RatingStar from '../common/RatingStar';

const CourseCard = ({course,customStyle,Height,screen}) => {

  const [Rating,setRating]=useState([]);
  const[reviewCount,setReviewCount]=useState(0);
 
  useEffect(()=>{
    setRating(GetAvgRating(course?.ratingAndReviews))
     setReviewCount(course?.ratingAndReviews?.length) 
  },[])

     
  return (
    <div>
        <NavLink to={`/courses/${course._id}`} className={customStyle}>
            
            <div>
                <img src={course?.thumbnail} 
                    alt={course?.courseName} 
                    className={`w-full h-[180px] sm:h-[300px] lg:h-[150px] object-center rounded-xl`}
                    style={screen ==='lg' ?{height:Height} :{}}
                    />
            </div>

               <div className='mt-3 ml-2'>
                   <p>{course?.courseName}</p>
                   <p> <span className='text-xl font-semibold font-edu-sa text-richblack-100'>By</span> {course?.instructor?.firstName}  {course?.instructor?.lastName}</p>
                   <div>
                     
                      <div className='flex  items-center'>
                      <span className='mr-2'>
                         {course?.ratingAndReviews?.length} 
                      </span>

                            <RatingStar
                              Review_Count={Rating}
                            />
                        <span className='ml-4'>Review {"("} {reviewCount} {")"}</span>     
                      </div>
                      
                   </div>
                   <p className='text-white'>RS {course?.price}</p>
               </div>
        </NavLink>
    </div>
  )
}

export default CourseCard