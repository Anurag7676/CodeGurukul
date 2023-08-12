import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import IconButton from "../../../../common/IconButton";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import { setStep,resetCourseState } from "../../../../../../Redux/slice/courseSlice";
import { editCourseDetails } from "../../../../../../services/operations/courseDetailsAPIs";

export default function CoursePublish(){

  const { register, handleSubmit, setValue, getValues } = useForm();
    
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token }= useSelector((state) => state.auth)
  const { course }= useSelector((state) => state.course)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

 const goBack=()=>{
    dispatch(setStep(2));
 }


 const gotoMyCourse=()=>{
    dispatch(resetCourseState());
    //navigate to my course
    navigate('/dashboard/my-courses');
 }
const handleCoursePublish=async()=>{
    if (
        (course?.status === COURSE_STATUS.PUBLISHED &&
          getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
      ) {
        // form has not been updated
        // no need to make api call
        gotoMyCourse()
        return;
      }
     else{
        const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
        gotoMyCourse()
    }
       setLoading(false)
     } 
}

 const onSubmit=(data)=>{
    handleCoursePublish();
 }

  return(

    <div className="text-richblack-50 mt-10  sm:ml-10 mb-5">
         <p className="text-2xl font-inter font-bold text-richblack-300">Publish settings</p>

         <form onSubmit={handleSubmit(onSubmit)}>
             <div className="mt-8 flex items-center gap-2">
                <label className="flex items-center">
                 <input
                    type="checkbox"
                    id="public"
                     {...register("public",{required:true})}
                   className="h-6 w-6 rounded-full bg-richblack-700 border-none outline-none text-yellow-100"
                  />
                  <span className="ml-2 text-richblack-400 font-semibold font-inter">
                     Make this course as public
                  </span>
                </label>
             </div>
             {/* Next Prev Button */}
             <div className="flex gap-x-5 items-center mt-4">
               <button
                disabled={loading}
                type="button"
                onClick={goBack}
               className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-6 py-2
               transition-all duration-200 hover:scale-95 font-semibold text-richblack-900"
              >
               Back
            </button>
            <IconButton type={"submit"} 
            text="Save changes" 
            customClasses={'bg-yellow-100 px-5 py-2 text-richblack-700 rounded-md border-none transition-all duration-200 hover:scale-95'}/>
           </div>
         </form>
           
    </div>
  )
}