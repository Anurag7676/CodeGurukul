import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Logo/codegurukul.png"
import { NavbarLinks } from "../../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileCard from "../auth/ProfileCard";

//for api
import { catagories } from "../../../services/allApis";
import { apiConnecter } from "../../../services/apiConnecter";

// ICONS
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { current } from "@reduxjs/toolkit";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

 




  // set api data for CATAGORIES
  const [sublinks, setSublinks] = useState([]);

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnecter("GET", catagories.CATAGORIES_API);
      //console.log(result?.data?.data);
      setSublinks(result?.data?.data);
    } catch (error) {
      console.log("did not get data", error);
    }
  }; 

  useEffect(() => {
    // Close mobile menu if screen width is >= 1024
    if (screenWidth >= 1024) {
      setMobileMenuVisible(false);
    }
  }, [screenWidth]);

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <>
      <div className="h-16 w-full lg:border-b-[1px] lg:border-b-richblack-700 py-4">
        <div className="lg:w-11/12 flex mx-auto justify-between items-center ">
          {/* Image */}
          <Link to={"/"}>
            <img src={logo} alt="logo" loading="lazy"
              className="w-[150px] lg:w-[230px] lg:h-[40px] object-cover"
            />
          </Link>
 
          <div className={`flex  gap-3 items-center relative`}>
         
       
          {/* NavLinks */}
          <nav className={` ${
                     mobileMenuVisible ? "z-50 visible lg:hidden w-[200px] absolute top-10 right-5 bg-richblack-800 p-4 rounded-md"
                      : "hidden relative lg:visible"
                     } mx-3 text-richblack-25 lg:flex`}
            
          >

            <ul className="text-richblack-5 flex gap-5">
              <li className="lg:flex gap-5 ">
                {NavbarLinks?.map((item, index) => (
                  <div key={index}>
                    {item?.title === "Catalog" ? (
                      <div className="relative flex items-center gap-2 group cursor-pointer">
                        <p>{item.title}</p>
                        <IoIosArrowDropdownCircle />

                        <div
                          className="z-40 invisible in absolute left-[50%]
                                 translate-x-[-50%] translate-y-[20%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]"
                        >
                          <div
                            className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                          ></div>

                          {sublinks.length ? (
                            sublinks.map((subLink, index) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                key={index}
                              >
                                <p className="hover:bg-richblack-25 py-2 pl-3 rounded-lg transition-all duration-200 scale-95">
                                  {subLink?.name}
                                </p>
                              </Link>
                            ))
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <NavLink to={item?.path}
                       className="hover:bg-richblack-800"
                      >{item?.title}</NavLink>
                    )}
                  </div>
                ))}
              </li>
            </ul>
          </nav>

          {/* Login/Signup/dsahbord */}
           <div className="flex  gap-4 items-center">
        
            {user && user.accountType !== "Instructor" && (
              <NavLink to="/dashboard/purchase-history" className="relative ">
                <AiOutlineShoppingCart className="text-white text-xl " />
                {totalItems > 0 && (
                  <span className="text-yellow-100 absolute -top-4 -left-3 ">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            )}

            {/* token not available that mean no user logind in */}
            {token === null && (
              <div className="flex items-center gap-2 justify-between ">
                <NavLink to="/login">
                  <button
                    className="text-richblack-100 lg:px-[12px] lg:py-[8px] rounded-md
                                text-xs lg:text-base lg:bg-richblack-700 lg:border-b-richblack-800"
                  >
                    Log in
                  </button>
                </NavLink>

                <NavLink to="/signup">
                  <button
                    className="text-richblack-100 lg:px-[12px] lg:py-[8px] rounded-md text-xs lg:text-base
                                   lg:bg-richblack-700 lg:border-b-richblack-800"
                  >
                    Sign up
                  </button>
                </NavLink>
              </div>
            )}

            {/* Token available that mean show the Profile Crad */}

            {token !== null && <ProfileCard />}
          </div>

          <button
            className="lg:hidden text-richblack-25 text-2xl"
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
           >
            ☰
         </button>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Navbar;
