import React, {  useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { getAllReview } from '../../../services/operations/studentFeaturesAPIs';
import ReactStars from 'react-stars'

const ReviewSlider = () => {

    const [allReview,setAllReview]=useState(null);

    const maxWord=15;
     
    useEffect(()=>{
         
        const fetchAllReview=async()=>{
          let result=await getAllReview();
           
          if(result)
          {
            setAllReview(result);
          }
        }

        fetchAllReview();
    },[])

  return (
    <div className=''>
        <Swiper
            spaceBetween={30}
             centeredSlides={true}
             autoplay={{
             delay: 1000,
            disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
               className="mySwiper " 
               breakpoints={{
                  640:{slidesPerView:1},
                  740:{slidesPerView:2},
                  1124:{slidesPerView:4}

             }}
        >
            {
                allReview?.map((review)=>(
                    <SwiperSlide key={review._id}
                     className='h-[200px] lg:w-[220px] bg-richblack-700 rounded-md p-4 flex flex-col '
                    >

                       <div className='flex items-center gap-2 text-sm text-richblack-500'>
                             <img src={review?.user?.image} alt="/userImage" 
                                className="w-[40px] h-[40px] rounded-full object-cover"
                             /> 
                             <div className='text-richblack-100'>
                               <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                               <p>{review?.user?.email}</p>
                             </div>
                             
                       </div>
                       <p className='text-richblack-25 text-xs mt-[0.7rem]'>
                         {review?.review.split(" ").slice(0, maxWord).join(" ")}
                       </p>
                      
                       <div className='flex gap-2 items-center'>
                       <p  className='text-yellow-200 '>{review?.rating}</p>
                        <ReactStars
                          edit={false} 
                          count={5}
                          size={20}
                          value={review?.rating} 
                        />
                       </div>
                       
                        <p className='text-richblack-400 text-xs'>Form :</p>
                        <span className='text-richblack-25 font-semibold text-xs'>
                       {review?.course?.courseName}
                       </span>
                       
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}

export default ReviewSlider