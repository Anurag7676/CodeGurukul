import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorDashboardData } from "../../../../../services/operations/profileAPI";
import { FaHandSparkles } from "react-icons/fa";
import { FcReadingEbook } from "react-icons/fc";
import IconButton from "../../../common/IconButton";
import { useNavigate } from "react-router-dom";
import { fetchInstructorAllCourses } from "../../../../../services/operations/courseDetailsAPIs";
import ViewChart from "./ViewChart";
import {FcStatistics} from "react-icons/fc"
import {HiUserGroup} from "react-icons/hi"
import {BsJournalBookmarkFill} from "react-icons/bs"
import {BiWalletAlt} from "react-icons/bi"

const InstructorDashboard = () => {
  const[courses,setCourses]=useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
     
      setLoading(true);
      const data = await getInstructorDashboardData(token);
      const allCoure=await fetchInstructorAllCourses(token);
       
      data.sort((a, b) => b.totalStudentEnrolled - a.totalStudentEnrolled);
      console.log(data)
      setCourses(allCoure);
      setDashboardStats(data);

      setLoading(false);
    };

    getData();
  }, []);

  let totalAmount;
  let totalSudentEnrolled;
  if (dashboardStats) {
    totalAmount = dashboardStats.reduce(
      (acc, cur) => acc + cur?.totalEarning,
      0
    );
    totalSudentEnrolled = dashboardStats.reduce(
      (acc, cur) => acc + cur?.totalStudentEnrolled,
      0
    );
    
  }

  if (loading) {
    return <div className="w-full h-full">Loading..........</div>;
  }

  return (
    <div className="w-full lg:w-[90%] mx-auto p-3 mt-5 lg:mt-0">
      <h1 className="text-xl lg:text-4xl flex gap-2 items-center text-white mt-4">
        Hi{" "}
        <span className="font-edu-sa tracking-widest text-richblack-100">
          {user?.firstName}
        </span>
        <FaHandSparkles style={{ color: "yellowgreen" }} />
      </h1>
      <p className="flex text-richblack-50 my-2">
        Let's get started <FcReadingEbook size={25} />
      </p>

      <div>
        {!loading && dashboardStats ? (
          <div className="w-full ">

             {/* CHART AND STATS */}
            <div className="w-full lg:flex lg:gap-x-48 ">

              {/* CHART SECTION */}
              <div className="w-full sm:w-[80%] sm:mx-auto mt-4 lg:w-[40%] border-[1.5px] border-yellow-900 rounded-md" >
                 <ViewChart courses={dashboardStats} />
              </div>

              <p className="flex lg:hidden items-center gap-x-2 w-fit mx-auto my-2 text-2xl text-yellow-100">
                   Statistics <FcStatistics size={20} />
                </p>

              {/* STATS SECTION */}
               <div 
                  className=" text-richblack-100 w-full lg:w-[20%] stat flex lg:flex-col items-center
                   rounded-md sm:justify-between sm:p-2
                  gap-y-2 border-[1.5px] border-yellow-900"          
               >  
                <p className="hidden lg:flex items-center gap-x-2 w-fit mx-auto my-2 text-2xl text-yellow-100">
                   Statistics <FcStatistics size={20} />
                </p>

                 <div className="lg:my-6">
                  <p className="flex flex-col lg:flex-row  gap-x-2 lg:w-fit text-center text-xl lg:mx-auto">
                    Total courses 
                   <span className="hidden lg:visible sm:visible"><BsJournalBookmarkFill/></span> 
                  </p>
                  <p className="text-center text-4xl text-white">
                     {dashboardStats?.length}
                  </p>
                </div>

                 <div className="flex flex-col gap-2 lg:my-6">
                  <p className="flex flex-col lg:flex-row text-center gap-x-2 items-center w-fit mx-auto text-xl">
                     Total Students 
                     <span className="hidden lg:visible sm:visible"><HiUserGroup/></span>
                  </p>
                  <p className="text-center text-4xl text-white">{totalSudentEnrolled}</p>
                </div>

                 <div>
                  <p  className="flex gap-x-2 items-center w-fit mx-auto text-xl text-center">
                   Total Earning 
                   <span className="hidden lg:visible sm:visible"><BiWalletAlt/></span>
                   </p>
                  <p className="text-center text-4xl text-white">{totalAmount}</p>
                </div>
              </div>
            </div>

            {/* COURSE CARD */}
            <div className=" w-full mt-7 lg:mt-7 ">

                       <div className="flex justify-between items-center my-2">
                          <p className="text-richblack-50 font-semibold text-xl">View courses</p>

                          <p 
                          className="text-yellow-50 font-semibold cursor-pointer"
                          onClick={()=>navigate("/dashboard/my-courses")}>
                              View all
                          </p>
                           
                        </div>

             <div className="flex flex-col lg:flex-row justify-between" >
              {
                courses.slice(0,3).map((course)=>(
                  <div key={course._id} 
                  className="stat p-2 w-full sm:w-[80%] mx-auto
                    flex flex-col sm:flex-row lg:flex-col gap-0 sm:gap-x-7 lg:gap-0"
                  >
                        
                        
                        <img 
                        loading="lazy"
                        src={course?.thumbnail} 
                        alt={course?.courseName} 
                        className="lg:h-[180px] lg:w-[250px] sm:h-[180px] sm:w-[250px] rounded-md object-cover card-style" 
                        />

                        <div className="flex flex-col gap-0 sm:gap-5 lg:gap-0">
                        <p className="font-semibold mt-2">
                          {course?.courseName}
                        </p>
                         
                        
                        <p className="flex gap-3 text-richblack-200">
                          
                           <span>Enrolled Students</span>
                           <span className="text-yellow-100">
                           {"("}
                           {course?.studentsEnrolled?.length}
                           {")"}
                           </span>
                        </p>
                        </div>
                      

                  </div>
                ))
              }
             </div>           
              
            </div>
          </div>
        ) : (
          <p>
            NO COURSE FOUND
            <IconButton
              text={"Add a course"}
              onClick={navigate("/dashboard/add-course")}
              customClasses={
                "bg-yellow-100 px-7 py-2 rounded-md border-none transition-all duration-200 hover:scale-95 hover:border-richblack-800 border-[1px]"
              }
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
