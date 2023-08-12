// import React, { useState } from 'react';
// import { sidebarLinks } from '../../../data/dashboard-links';
// import { useDispatch, useSelector } from 'react-redux';
import SidebarLinks from "./SidebarLinks";
// import { VscSignOut } from 'react-icons/vsc';
// import ConfirmationModal from '../common/ConfirmationModal';
// import { logout } from '../../../services/operations/authApi';
// import { useNavigate } from 'react-router';

// const Sidebar = () => {
//     const{loading:profileLoading,user}=useSelector((state)=>state.profile);
//     const{loading:authLoading}=useSelector((state)=>state.auth);
//     const[confirmationModal,setConfirmationmodal]=useState(null);
//     const dispatch=useDispatch();
//     const navigate=useNavigate();

//     if(authLoading || profileLoading)
//     {
//         return (
//             <div className="text-lg text-white">Loading...</div>
//         )
//     }

//   return (
//     <div className='lg:w-[250px] h-[calc(100vh-3rem)] relative
//     bg-[#161D29] border-r-[0.8px] border-r-richblack-300'>

//          <div className='flex flex-col  items-start pt-8
//          gap-8 lg:max-w-[250px] '>

//            {
//              sidebarLinks?.map((item,index)=>{
//                 if(item.type && user?.accountType !==item?.type) return null;
//                 return(
//                     <SidebarLinks
//                         item={item}
//                         iconName={item.icon}
//                         key={index}
//                     />
//                 )
//            })
//            }

//            {/* for hosrizontal divider line in side bar */}
//            <div className='w-10/12 h-[1px] mx-auto my-6 bg-richblack-400'></div>

//             {/* ** SETTINGS */}
//            <div className='flex flex-col gap-8'>

//                <SidebarLinks item={{name:"Settings",path:"/dashboard/Settings"}}
//                 iconName="VscSettingsGear"
//                />

//                {/* //logOUT BUTTON */}

//                 <button
//                  onClick={()=>setConfirmationmodal({

//                     text1:"Are you sure ?",
//                     text2:"You will be logedout from your account",
//                     btn1Text:"Logout",
//                     btn2Text:"Cancle",
//                     btn1Handler:()=>dispatch(logout(navigate)),
//                     btn2Handler:()=>setConfirmationmodal(null)
//                  })}
//                 >
//                 <div className='flex items-center gap-x-2 pl-2'>
//                     <VscSignOut className='text-xl'/>
//                     <span>Logout</span>
//                 </div>

//                 </button>
//            </div>
//          </div>
//          {
//           confirmationModal &&

//           <div className='lg:w-[400px] px-6 py-10 rounded-lg absolute left-[200%] top-[30%] z-40 backdrop-blur-3xl '>
//             <ConfirmationModal
//               modalData={confirmationModal}
//               />
//           </div>

//          }
//     </div>
//   )
// }

// export default Sidebar

import React, { useEffect, useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut, VscMenu } from "react-icons/vsc";
import ConfirmationModal from "../common/ConfirmationModal";
import { logout } from "../../../services/operations/authApi";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const { loading: profileLoading, user } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Attach event listener on component mount
    window.addEventListener("resize", updateScreenWidth);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (authLoading || profileLoading) {
    return <div className="text-lg text-white">Loading...</div>;
  }

  return (
    <div className="lg:w-[250px]  h-[calc(100vh-3rem)] relative
     bg-[#161D29] border-r-[0.8px] border-r-richblack-300">
      <div
        className={`lg:hidden cursor-pointer absolute  
        left-1 top-2 z-30 border-[1px] border-richblack-200 p-1
        transition-all duration-300 ease-in-out

        `}
      
        onClick={toggleDrawer}
      >
        <VscMenu className="text-xl text-white" size={25}/>
      </div>

      <div
        className={`pt-14 flex flex-col items-start lg:pt-8 gap-8 lg:max-w-[250px] ${
          isDrawerOpen ? "w-[200px]" : ""
        }   transition-all duration-400 ease-in-out`}
        style={screenWidth<1000 ? { transform: isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)' } 
        :
        { transform: isDrawerOpen ? 'translateX(0)' : 'translateX(0)' }
        }
      >
        {screenWidth < 1000 ? (
          <div className="flex flex-col gap-5">
            {isDrawerOpen &&
              sidebarLinks?.map((item, index) => {
                if (item.type && user?.accountType !== item?.type) return null;
                return (
                  <div key={index} 
                  onClick={()=>setIsDrawerOpen(false)}
                  >
                  <SidebarLinks item={item} iconName={item.icon} 
                    />
                  </div>
                  
                );
              })}
          </div>
        ) : (
          <div className="flex flex-col gap-y-3 lg:gap-y-9">
            {sidebarLinks?.map((item, index) => {
              if (item.type && user?.accountType !== item?.type) return null;
              return (
                <SidebarLinks item={item} iconName={item.icon} key={index} />
              );
            })}
          </div>
        )}

        {screenWidth < 1000 ? (
          <div>
            {isDrawerOpen ? (
              <div>
                <div className="w-10/12 h-[1px] mx-auto my-6 bg-richblack-400"></div>

                <div className="flex flex-col gap-8">
                  <SidebarLinks
                    item={{ name: "Settings", path: "/dashboard/Settings" }}
                    iconName="VscSettingsGear"
                  />

                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out from your account",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <div className="flex items-center gap-2 ">
                      <VscSignOut className="text-xl" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="w-full">
            <div className="w-11/12 h-[1px] mx-auto my-6 bg-richblack-400"></div>

            <div className="flex flex-col gap-8">
              <SidebarLinks
                item={{ name: "Settings", path: "/dashboard/Settings" }}
                iconName="VscSettingsGear"
              />

              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out from your account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
              >
                <div className="flex items-center gap-2 pl-2">
                  <VscSignOut className="text-xl" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmationModal && (
        <div 
          className="w-[300px] lg:w-[400px] px-4 py-6 lg:px-6 lg:py-10 rounded-lg 
          absolute top-10 left-[25%] lg:left-[200%] lg:top-[30%] z-40 backdrop-blur-3xl 
          transition-all duration-300 ease-in-out md:top-[25%] md:left-[90%] " 
          >
          <ConfirmationModal 
           modalData={confirmationModal} 
           />
        </div>
      )}
    </div>
  );
};

export default Sidebar;


