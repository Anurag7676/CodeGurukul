import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import IconButton from '../common/IconButton';
import { giveRatingReview } from '../../../services/operations/studentFeaturesAPIs';
import {AiOutlineClose} from "react-icons/ai"

const CourseReviewModal = ({setReviewModal,courseID}) => {

    const{user}=useSelector((state)=>state.profile);
    const{token}=useSelector((state)=>state.auth);
    const{setValue,register,handleSubmit}=useForm();
    console.log(user.image);

    useEffect(()=>{
          
      setValue("courseExperience","");
      setValue("courseRating",0)
    },[])

   const ratingChanged=(newRating)=>{
     setValue("courseRating",newRating)
       }
    const fromSubmithandler=async(data)=>{

           const formdata=new FormData();
           formdata.append("rating",data.courseRating);
           formdata.append("review",data.courseExperience) ;
           formdata.append("courseID",courseID);

           await giveRatingReview(formdata,token);
           
          setReviewModal(false);
    }

  return (
    <div className='text-richblack-25 px-12 shadow-2xl 
     py-6 rounded-md border-[1px] border-richblack-600
      bg-richblack-900  '>
          <div>
             {/* **MODAL HEADER** */}
               <div className='flex justify-between'>
                 <p>Add a review</p>
                 <p onClick={()=>setReviewModal(false)}><AiOutlineClose style={{color:'tomato',cursor:'pointer'}} size={25}/></p>
               </div>

               {/* MODAL BODY */}
               <div className='mt-2'>
                      <div className='flex gap-3'>

                     
                      <img src={user.image} 
                           alt="" 
                           srcset=""
                           className='w-[50px] h-[50px] rounded-full object-cover
                           border-[0.5px] border-richblack-600'
                            />
                           <div className='flex flex-col gap-1'>
                            <p>{user?.firstName}{" "}{user?.lastName} </p>
                            <p>Post publicaly</p>
                         </div>
                      </div>

                      <form onSubmit={handleSubmit(fromSubmithandler)}>

                           <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                           />

                           <label>
                            <p>Add your experience</p>

                            <textarea  
                            className='mt-2 border-none outline-none bg-richblack-700 p-2 text-lg rounded-md'
                            cols="30" 
                            rows="8"
                            {...register("courseExperience",{required:true})} 
                            />
                           </label>

                           <div className='flex justify-between mt-3 '>
                              <button 
                              className='border-[1px] border-richblack-400 px-6 py-2 rounded-md'
                              onClick={()=> setReviewModal(false)}>
                                Cancel
                              </button>

                              <IconButton
                               type={'submit'}
                                text={"Save"}
                                customClasses={"bg-yellow-100 text-richblack-800 font-semibold px-6 py-2 rounded-md border-yellow-400 transitaion-all duration-200 hover:scale-95"}
                              />
                           </div>
                      </form>
               </div>
          </div>
    </div>
  )
}

export default CourseReviewModal