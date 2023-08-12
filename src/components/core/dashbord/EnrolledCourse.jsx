import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledCourse } from "../../../services/operations/profileAPI";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";

const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const [enrollrdCourse, setEnrolledcourse] = useState([]);
  const [courseProgress,setCourseProgress]=useState([])
  
  useEffect(() => {
    dispatch(getEnrolledCourse(token, setEnrolledcourse,setCourseProgress));
  }, []);

  if (enrollrdCourse) {
   //
  }

  

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mt-10 tracking-wider">
          Enrolled Course
        </h1>

        {/* *THIS is FOR TAB */}
        <div></div>

        {/* ***COURSE DETAILS */}

        <div className="w-full lg:w-[90%] relative">
          <Table className="rounded-xl border border-richblack-800 p-2 w-full  lg:mt-4">
            <Thead className='w-full'>
              <Tr className="flex gap-x-10 w-full rounded-t-md border-b border-b-richblack-800 px-12 py-2">
                <Th className="-ml-4 flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                  Courses
                </Th>
                <Th className=" text-left text-sm font-medium uppercase text-richblack-100 mx-2">
                  Duration
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-richblack-100 ">
                  Progress
                </Th>
                
              </Tr>
            </Thead>

            <Tbody>
              {enrollrdCourse.length === 0 ? (
                <Tr>
                  <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                    No courses found
                    {/* TODO: Need to change this state */}
                  </Td>
                </Tr>
              ) : (
                enrollrdCourse.map((course) => (
                  <Tr
                    key={course._id}
                    className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                  >
                    <Td 
                    onClick={()=>{
                      navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)
                    }}
                    className="flex items-center flex-1 gap-x-4">
                        <img
                          src={course?.thumbnail}
                          alt={course.courseName}
                          className="h-[148px] w-[220px] rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-lg font-semibold text-richblack-5">
                            {course?.courseName}
                          </p>
                          <p className="text-base text-richblack-300">
                            {course.courseDescription
                              .split(" ")
                              .slice(0, 5)
                              .join(" ") + "..."}
                          </p>
                        </div>
       
                    </Td>

                    <Td >
                      <p>2hr 30-min</p>
                    </Td>

                    <Td className=''>

                     <p>
                     {
                       

                     }</p>
                      <p>Progress: {course?.progressPercentage || 0}%</p>
                      <ProgressBar
                        completed={course?.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                        bgColor={"blue"}
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default EnrolledCourse;

  