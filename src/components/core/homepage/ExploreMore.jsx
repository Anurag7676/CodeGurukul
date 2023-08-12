import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import {IoMdContacts} from "react-icons/io"


const ExploreMore = () => {
    const tabsName=[
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ];

     const [currentTab,setCurrenttab]=useState(tabsName[0]);
     const [course,setCourses]=useState(HomePageExplore[0].courses);
     const [currentCrad,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

     const setMycrad=(value)=>{
        
        console.log("clickec",value);
        setCurrenttab(value);
        const newCourse=HomePageExplore.filter((course)=>course.tag===value);
        console.log(newCourse);
        setCourses(newCourse[0].courses);
        setCurrentCard(newCourse[0].courses[0].heading);
     }

     const setCard=()=>{

     }
  return (
   <>
      <div className='mt-24 mb-20'>

       <h1 className='text-3xl font-bold mx-auto w-fit text-center'>Unlock the 
       <HighLightText text={"power of code"} 
       color={"text-blue-100"}/>
       </h1>

       <p className='text-richblack-300 text-center my-2'>Learn to Build Anything You Can Imagine</p>

               {/* TAB */}
       <div className='hidden lg:visible mx-auto w-[60%] rounded-full px-3 justify-evenly lg:flex gap-3 bg-richblack-700 py-3 my-4'>
        {
            tabsName?.map((item)=>(

                <div
                key={item}
                className={`text-[16px] flex items-center text-sm font-medium ${currentTab===item ? 
                "bg-richblack-900 text-richblack-5" 
                :"text-richblack-200"} transition-all duration-300 rounded-full cursor-pointer px-3 py-3`}
                onClick={()=>setMycrad(item)}
                >
                {item}
                </div>
            ))
        }
       </div>
          
          {/* CARD  */}
          <div className='flex flex-col lg:flex-row gap-4 mt-10 lg:w-[80%] mx-auto lg:-mb-36'>
            {
                course?.map((item,index)=>(
                    <div
                    key={item.heading}
                    onClick={()=>setCard}
                    className={`
                    flex flex-col gap-2 rounded-lg lg:transition-all duration-300 lg:hover:scale-105 lg:w-[33%]
                    ${index===0 ?"bg-white shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] text-richblack-500" :"bg-richblack-800 text-richblack-400"} px-7 py-7`}
                    >
                      <p>{item?.heading}</p>
                       <p>{item?.description}</p>
                        
                        <div className='h-0.5 bdr'></div>
                       <div className='flex items-center justify-between '>
                         <p className='flex items-center gap-2 '> <IoMdContacts/> {item?.level}</p>
                         <p > {item?.lessionNumber}</p>
                       </div>
                    </div>
                ))
            }
          </div>

      </div>
   </>
  )
}

export default ExploreMore