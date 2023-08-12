import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconButton from '../common/IconButton'

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();


  return (
  <div className='w-[100%]'>
  <div className=''>
        <h1 className='text-3xl font-bold font-inter mt-8'>
            My Profile
        </h1>

           {/* section 1 */}
           <div 
            className='relative w-full lg:w-[60%]  py-8
            bg-[#161D29] lg:px-3 px-1 lg:ml-8 mt-6 rounded-md
            '>
               <div className='flex gap-2 items-center'>
                <img 
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className='aspect-square w-[78px] rounded-full object-cover' />

                <div className='flex flex-col '>
                    <p> {user?.firstName + " " + user?.lastName} </p>
                    <p className='text-richblack-500'> {user?.email}</p>
                </div>
              </div>
              
              <div 
              onClick={()=>navigate("/dashboard/settings")}
              className='absolute  right-2 top-5  '>
                <IconButton
                  text="Edit"
                  customClasses="px-4 py-2 text-richblack-800 bg-yellow-100 rounded-md transition-all duration-200 hover:scale-95 "
                  onclick={onclick} >

               </IconButton>
              </div>
          
           </div>

            {/* section 2 */}
         <div className='relative w-full lg:w-[60%] 00  py-4 bg-[#161D29] px-3 lg:ml-8 mt-6 rounded-md'>
            <div className='flex'>
                <p>About</p>

               <div onClick={()=>navigate("/dashboard/settings")}>
               <IconButton
                text="Edit"
                customClasses="absolute text-richblack-800 top-5 right-2 px-4 py-2 bg-yellow-100
                rounded-md transition-all duration-200 hover:scale-95  "
                >
                </IconButton>
               </div>
                
            </div>
            <p className='text-richblack-400'> {user?.additonalDetails?.about? (`${user?.additonalDetails?.about}`):  "Write Something about Yourself"}</p>
         </div>

         {/* section 3 */}
          <div className='relative lg:w-[60%] lg:mb-5 py-4 bg-[#161D29] px-3 lg:ml-8 my-6 rounded-md text-richblack-300'>
            <div>
                <p className='text-xl text-richblack-100'>Personal Details</p>

                <div onClick={()=>navigate("/dashboard/settings")}>
                <IconButton
                text="Edit"
                customClasses="absolute top-5 right-2 px-4 py-2 bg-yellow-100
                rounded-md transition-all duration-200 hover:scale-95  text-richblack-800"
                 />
                </div>
            </div>
            <div className='mt-7 flex flex-col gap-5'>

               <div className='flex justify-between'>

                 <div className='flex flex-col gap-1 lg:px-4'>
                    <p>First Name</p>
                    <p>{user?.firstName}</p>
                 </div>

                 <div className='flex flex-col gap-1 lg:px-4'>
                    <p>Last Name</p>
                    <p>{user?.lastName}</p>
                </div>

               </div>
               
                <div className='flex justify-between lg:px-4'>
                    <p>Email</p>
                    <p>{user?.email}</p>
                </div>
                <div className='flex justify-between lg:px-4'>
                    <p>Gender</p>
                    <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                
                <div className='flex justify-between lg:px-4'>
                    <p>Phone Number</p>
                    <p>{user?.additonalDetails?.contactNumber ?(`${user?.additonalDetails?.contactNumber}`) 
                    : "Add Contact Number"}
                    </p>
                </div>
                <div className='flex justify-between lg:px-4'>
                    <p>Date of Birth</p>
                    <p>{user?.additonalDetails?.dateOfBirth ? (`${user?.additonalDetails?.dateOfBirth}`) 
                    :"Add Date of Birth"}</p>
                </div>
            </div>
         </div>

  </div>
  </div>
  )
}

export default MyProfile