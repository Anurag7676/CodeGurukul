import React from 'react'
import IconButton from './IconButton'
import Upload from '../dashbord/instructor/create course/course_builder/Upload'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='bg-richblue-900 p-2 rounded-md'>
         <div>
             <p className='text-richblack-50 font-bold lg:text-xl'>{modalData.text1}</p>
             <p className='text-yellow-300 font-semibold mt-3 '>{modalData.text2}</p>

             <div className='flex gap-5 mt-4'>
                 <IconButton
                  onClick={modalData.btn1Handler}
                  text={modalData.btn1Text}
                  customClasses="bg-yellow-50 p-2 rounded-md text-richblack-700 font-semibold"
                  />
                  <button 
                  className='bg-richblack-700 text-richblack-25 p-2 rounded-md'
                  onClick={modalData.btn2Handler}>
                           {modalData.btn2Text}
                  </button>
                  
             </div>
         </div>
    </div>
  )
}

export default ConfirmationModal