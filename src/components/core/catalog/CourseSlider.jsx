import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import CourseCard from './CourseCard'

const CourseSlider = ({courses,dealy}) => {
  return (
    <>
        {
            courses?.length ? (
              <Swiper
               slidesPerView={1}
               spaceBetween={200}
               centeredSlides={true}
               loop={true}
               autoplay={{
                          delay: dealy,
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
                
                  1124:{slidesPerView:3}

             }}
                >
                    {
                        courses?.map((course, index)=> (
                            <SwiperSlide key={index} >
                                <CourseCard 
                                Height={"150px"}
                                course={course}  
                                customStyle={"lg:h-[250px] p-1 "}/>
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p>No Course Found</p>
            )

        }
    </>
  )
}

export default CourseSlider;
