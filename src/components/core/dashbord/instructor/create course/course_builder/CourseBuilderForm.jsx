import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import IconButton from '../../../../common/IconButton';
import {BiMessageSquareAdd} from "react-icons/bi"
import {useDispatch, useSelector} from "react-redux"
import { setCourse, setEditCourse, setStep } from '../../../../../../Redux/slice/courseSlice';
import {toast} from "react-hot-toast";
import { createSection,editSection } from '../../../../../../services/operations/courseDetailsAPIs';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
  const {course}=useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);

  const dispatch=useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
      } = useForm();
     const[editSectionname,setEditsectioname]=useState(null);

     useEffect(()=>{
      
     },[editSectionname])

     //cnacel edit***
     const cancelEdit=()=>{
        setEditsectioname(null);
        setValue("sectionName","");
     }

     //back to previous form 
     const goBack=()=>{
       dispatch(setStep(1));
       dispatch(setEditCourse(true))
     }

     //go to next section
     const goNext=()=>{
        if(course.courseContent.length===0)
        {
          toast.error("Plese atleast add a section");
          return;
        }   
        
        //some(): The some() method is a higher-order function in JavaScript that 
        //checks whether at least one element in an array satisfies a given condition. 
        if(course.courseContent.some((section)=>section.subSection.length===0))
        {
          toast.error("Please add atleast one lecture in each section");
          return;
        }

        //if everything ok then go to publish form
        dispatch(setStep(3));
     }
     
      //***handel chageEdit section name
        const handelChangeEditSectionName=(sectionId,sectionName)=>{

          if(editSectionname ===sectionId)
          {
            cancelEdit();
            return;
          }
          else{
           setEditsectioname(sectionId);
           setValue("sectionName",sectionName);
          }
     }

   //****submit hander for Create/edit Section
   const submitHandler=async(data)=>{
      
         let result=null;

          //if user edit the section mane
         if(editSectionname)
         {
          result=await editSection({
            sectionName:data.sectionName,
            sectionID:editSectionname, //doubt ? how any sectionID =courser._ID
            courseID:course?._id,
          },token);
          setEditsectioname(null);
          setValue("sectionName","");
         }

        //if user 1st time create the sectionName
         else{
           result=await createSection({
             sectionName:data?.sectionName,
             courseID:course?._id,
           },token)
         }
         
         //if data sucessfully create in DB
         if(result)
         {
            dispatch(setCourse(result));
            setEditsectioname(null);
            setValue("sectionName","");
         }
         
     }
     

  return (
    <>
         <div className='text-richblack-700 mt-8 relative'>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label>
                    <p className='text-xl font-inter font-semibold text-richblack-200'>Course Builder</p>

                    <input type="text"
                      placeholder='Add a section of your course'
                      {...register("sectionName",{required:true})}
                      className='px-2 py-2 bg-richblack-700 
                      rounded-md border-none outline-none mt-5
                      w-full lg:w-[80%] text-richblack-100 font-edu-sa
                      '
                     />
                </label>

                <div className='outline-[1px] outline-yellow-100  py-2 '>
                    <IconButton
                     type={"submit"}
                     text={editSectionname ? "Edit Section Name" :"Create Section"}
                      customClasses={'outline-[1px] outline-yellow-100 px-3 text-richblack-50 py-2 border-[1px] border-yellow-100'}
                      icon={BiMessageSquareAdd}
                   / > 
                   {
                    editSectionname && 
                        <button 
                         type='button'
                         onClick={cancelEdit}
                        className='text-richblack-500 font-bold'
                        >
                        Cancel Edit
                        </button>  
                    
                   }
                    
                </div>
            </form>

              <div>
                  {
                    course?.courseContent?.length>0 &&(
                      <>
                        <NestedView
                          editHandler={handelChangeEditSectionName}
                        />
                      </>
                    )
                  }
              </div>

              <div className='mt-6 flex gap-5'>
                     <IconButton
                      text="Back"
                      onClick={goBack}
                      customClasses={"px-4 py-2 text-richblack-300 bg-richblack-700 rounded-md font-semibold"}
                     />

                     <IconButton
                      text="Next"
                      onClick={goNext}
                      customClasses={" px-4 py-2 text-richblack-800 rounded-md font-semibold bg-yellow-100"}
                     />
              </div>
         </div>
    </>
  )
}

export default CourseBuilderForm