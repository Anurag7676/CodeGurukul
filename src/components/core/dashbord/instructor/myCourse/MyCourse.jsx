import React, { useEffect, useState } from 'react'
import IconButton from '../../../common/IconButton'
import { fetchInstructorAllCourses } from '../../../../../services/operations/courseDetailsAPIs'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CourseTable from './CourseTable';


const MyCourse = () => {
const [courses,setCourses]=useState([]);
const {token}=useSelector((state)=>state.auth);
const navigate=useNavigate();

useEffect(()=>{
   const getInstructorAllCourses=async()=>{

    let result=await fetchInstructorAllCourses(token);
    if(result)
    {
        setCourses(result);
    }
   }
   getInstructorAllCourses();
},[]);

  return (        
        <div className='mt-4 w-full '>
             <div className='flex justify-between items-center w-full lg:w-[90%] my-3'>
                 <h1>My Course</h1>

                 <IconButton 
                    text={"Add course"}
                    customClasses={'bg-yellow-50 px-4 py-2 text-richblack-800 font-semibold transition-all duration-300 hover:scale-95 rounded-md'}
                    onClick={()=>navigate("/dashboard/add-course")}
                 />
             </div>

             {courses.length>0 && 
                         <CourseTable
                           courses={courses}
                           setCourses={setCourses}
                        />      
             }
        </div>

  )
}

export default MyCourse