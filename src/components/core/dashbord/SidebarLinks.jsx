import React from 'react';
import * as Icons from 'react-icons/vsc';
//import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLinks = ({item,iconName}) => {

    const Icon=Icons[iconName];
    const location=useLocation();
    //const dispatch=useDispatch();
 
    const matchRoute=(route)=>{
       return matchPath({path:route}, location.pathname)
    }
  return (
    <div>
         <NavLink
          to={item.path}
          className={`relative text-base lg:h-full 
                            ${matchRoute(item.path) ?" text-white"
          :"text-richblack-300"
          }`}
         
         onClick={()=> matchRoute}
         >
            <div className='flex gap-2 items-center lg:pl-2 pl-0.5'>
                <Icon className="text-lg"/>
                <span>{item?.name}</span>
            </div>
         </NavLink>
    </div>
  )
}

export default SidebarLinks