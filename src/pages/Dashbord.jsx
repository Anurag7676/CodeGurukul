// import React from 'react'
// import {useSelector} from "react-redux";
// import {Outlet} from "react-router-dom"
// import Sidebar from "../components/core/dashbord/Sidebar";

// const Dashbord = () => {

//     const{loading:authLoading}=useSelector( (state)=>state.auth);
//     const{loading:profileLoading}=useSelector((state)=>state.profile);

//     if(authLoading || profileLoading){
//         return (
//             <div>Loading...</div>
//         )
//     }
//   return (
//         <div className='text-white flex   gap-8 w-screen h-[calc(100vh-4rem)] overflow-hidden relative'>
             
//              <div className='lg:w-[22%]'>
//                 <Sidebar/>
//              </div>
            

//             <div className='lg:w-[78%] overflow-y-auto scrollable-outlet
//              bg-richblack-900 mt-2
//              '>
//              <div className='w-full'>
//                <Outlet/>
//              </div>
               
//             </div>

//     </div>
//   )
// }

// export default Dashbord;

import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/dashbord/Sidebar';

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-white flex gap-8 w-screen h-[calc(100vh-4rem)] overflow-hidden relative'>
    
      <div className='lg:w-[22%] absolute lg:relative  z-50'>
        <Sidebar />
      </div>

      <div className='w-full px-3 lg:px-0 lg:w-[78%] overflow-y-auto bg-richblack-900 mt-6 lg:mt-0 relative z-0'>
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
