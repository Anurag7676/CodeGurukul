import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RiDeleteBin6Line} from "react-icons/ri"
import {removeFromCart} from "../../../../Redux/slice/cartSlice"
import GetAvgRating from '../../../../utils/avgRating'
import RatingStar from "../../common/RatingStar"
const RenderCartCourse = () => {
    
    const {cart} = useSelector((state) => state.cart);

    console.log(cart)
    const dispatch = useDispatch();
  return (
    <div className=' p-3 pl-0'>
    {
        cart.map((course, index) => (
            <div key={course._id} className='p-1 pl-0 flex flex-col lg:flex-row w-full justify-between mt-7 border-b-richblack-400 border-b-[1px]'>
                <div className='flex flex-col lg:flex-row gap-3'>
                    <img src={course?.thumbnail} alt="tumbnail"
                      className='lg:w-[130px] rounded-md'  
                    />
                    <div className='text-sm text-richblack-300 flex flex-col gap-2'>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>

                        <div className='flex gap-2'>

                           <span>{ GetAvgRating(course?.ratingAndReviews)}</span> 
                            
                            <RatingStar
                               Review_Count={GetAvgRating(course?.ratingAndReviews)} 
                            />
                   
                            <span>{`( ${course?.ratingAndReviews?.length} ) Reviews`}</span>

                        </div>
                    </div>
                </div>

                <div className='flex flex-row-reverse justify-between mt-5 lg:mt-0 lg:block'>
                    <button
                    style={{color:'red',backgroundColor:''}}
                    className='flex gap-1 items-center px-4 py-2 rounded-md border-[1px] '
                    onClick={() => dispatch(removeFromCart(course._id))}
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>

                    <p className='text-yellow-100 mt-3'>Rs {course?.price} </p>
                </div>
            </div>
        ))
    }
      
    </div>
  )
}

export default RenderCartCourse