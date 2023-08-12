import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import {Outlet,useParams} from "react-router-dom"
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPIs'
import {  VscMenu } from "react-icons/vsc";
import { 
  setCompletedLectures, 
  setCourseSectionData, 
  setEntireCourseData, 
  setTotalNoOfLectures 
} from '../Redux/slice/viewCourseSlice'

import CourseReviewModal from '../components/core/viewCourseDetails/CourseReviewModal'
import VideoDetailsSidebar from '../components/core/viewCourseDetails/VideoDetailsSidebar'

const ViewCourse = () => {

    const[reviewModal,setReviewModal]=useState(false)
    const {token}=useSelector((state)=>state.auth);
    const {courseID}=useParams();
    const dispatch=useDispatch();
    const {completedLectures} = useSelector((state) => state.viewCourse);
    useEffect(()=>{


        if(token)
        {
           const setCourseData=async()=>{
               const courseData=await getFullDetailsOfCourse(courseID,token);

               console.log(courseData,"course data printing")

               dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
               dispatch(setEntireCourseData(courseData?.courseDetails));
               dispatch(setCompletedLectures(courseData?.completedVideos));

               let lecture=0;

               courseData?.courseDetails?.courseContent.forEach((sec)=>{
                 lecture +=sec?.subSection?.length;
               })


               dispatch(setTotalNoOfLectures(lecture))
           }

           setCourseData();
        }
    },[courseID])

  return (
  
    <div className='w-screen h-[calc(100vh-4rem)] relative flex gap-8 overflow-hidden'>

    {/* SIDEBAR */}
    <div className='lg:w-[22%]  absolute lg:relative  z-50  h-full '>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
    </div>

    {/* OUTLET */}
    <div className='w-full px-3 lg:px-0 lg:w-[78%] overflow-y-auto bg-richblack-900 mt-6 lg:mt-0 relative z-0'>
        <div className='w-full'>
          <Outlet />
        </div>
    </div>


     {/* REVIEW MODAL */}
    <div className='absolute top-[10%] left-[50%] translate-x-[-50%] overflow-y-auto'>
        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal} courseID={courseID}/>
        }
    </div>

</div>

  )
}

export default ViewCourse