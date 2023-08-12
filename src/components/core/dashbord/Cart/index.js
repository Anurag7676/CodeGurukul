import React from 'react'
import { useSelector } from "react-redux"
import RenderCartCourse from './RenderCartCourse';
import RenderCartAmount from './RenderCartAmount';

export default function Cart () {
    const{totalItems,total}=useSelector((state)=> state.cart);

  return (
    <>
        <h1 className='lg:mt-10 text-2xl text-richblack-100 tracking-wider font-bold mt-8 '>
          Your Cart
        </h1>
        <p className='lg:mt-6 text-richblack-50 ml-6'>{totalItems} Courses in your cart</p>

         <div>
         {
            total>0 ? 
            (<div className='flex flex-col lg:flex-row w-full lg:w-[95%] mx-auto p-2 border-t-[1px] border-t-richblack-600'>

            <div className='w-full lg:w-[72%]'>
              <RenderCartCourse/>
            </div>
            <div className='w-full lg:w-[25%]'>
              <RenderCartAmount/>
            </div>
                                              
            </div>)
            :
            (<p className='mt-28 text-4xl font-bold text-center tracking-widest'>Your cart is empty</p>)
         }
         </div>
        
    </>
  )
}

