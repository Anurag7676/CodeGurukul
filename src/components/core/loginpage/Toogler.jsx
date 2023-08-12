import React, { useEffect, useState } from 'react'

    
    const Toogler = ({accountType}) => {
    const [toggleValue,setTogglevalue]=useState("Student");
    const toggle=["Student","Instructor"];

    function toggleHandler(value){
        setTogglevalue(value);
        accountType(value)
    }
    //  useEffect(()=>{
    //    toggleHandler();
    //   },[]);
    accountType(toggleValue);
  return (
    <>
        <div className='w-[60%] lg:w-[50%] flex font-bold text-[14px] items-center 
         font-inter bg-[#161D29] justify-around rounded-full'>
          {
            toggle.map((item,index)=>(

                <div 
                 key={index}
                 className={`
                 mx-2 my-2 px-2 py-2
               rounded-full cursor-pointer
                 ${toggleValue===item ?"bg-[#000814] text-[#F1F2FF]" 
                     : 
                 "bg-[#161D29] text-[#999DAA] "}
                 `}
                 onClick={()=>toggleHandler(item)}
                >
                    {item}
                </div>
            ))
          }
        </div>
    </>
  )
}

export default Toogler