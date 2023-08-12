import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import IconButton from "../common/IconButton";
import {AiOutlineArrowLeft} from "react-icons/ai"

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActivestatus] = useState("");
  const [videobarActive, setVideobaractive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionID, subSectionID } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  //for small screen control
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    // immidiate invoked function IIF*

    const setActiveFlag = () => {
      if (!courseSectionData) return;

      // to get current section index
      const currentSectionIndex = courseSectionData?.findIndex(
        (data) => data?._id === sectionID
      );

      //to get current sub-section index
      const currentSubsectionindex = courseSectionData[
        currentSectionIndex
      ]?.subSection?.findIndex((data) => data?._id === subSectionID);

      //get active sub-section id
      const activeSubsectionID =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubsectionindex
        ]?._id;

      //set active status //set section
      setActivestatus(courseSectionData[currentSectionIndex]?._id);

      //set active video bar // set sub-section
      setVideobaractive(activeSubsectionID);
    };

    setActiveFlag();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div
        className="text-white w-full lg:max-w-[350px] border-r-[1px]
         border-richblack-200 h-full relative bg-richblack-700 "
      >
        <div
          className={`lg:hidden cursor-pointer absolute  
        left-1 top-2 z-50 border-[1px] border-richblack-200 p-1
        transition-all duration-300 ease-in-out

        `}
          onClick={toggleDrawer}
        >
          <VscMenu className="text-xl text-white" size={25} />
        </div>

        <div
          className={`pt-14 flex flex-col items-start lg:pt-8 gap-8  ${
            isDrawerOpen ? "w-[200px]" : ""
          }   transition-all duration-400 ease-in-out`}
          style={
            screenWidth < 1000
              ? {
                  transform: isDrawerOpen
                    ? "translateX(0)"
                    : "translateX(-100%)",
                }
              : { transform: isDrawerOpen ? "translateX(0)" : "translateX(0)" }
          }
        >
          <div className="">
            {screenWidth < 1024 ? (
              <div>
                {isDrawerOpen ? (
                  <div className="flex flex-col gap-5">
                    {/* **FOR BUTTONS */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-3">
                        <div
                          onClick={() => {
                            navigate("/dashboard/enrolled-courses");
                          }}
                          className=" r
                           text-center text-richblack-50 flex gap-2 items-center text-lg justify-center
                           tracking-wider
                           cursor-pointer underline "
                        >
                          <AiOutlineArrowLeft/>Back
                        </div>
                         <div className="w-[90%] mx-auto p-1 
                           border-yellow-500 border-[1px]">
                          <IconButton
                            text={"Add a review"}
                            onClick={() => setReviewModal(true)}
                            customClasses='text-center  ml-4 '
                          />
                        </div>
                      </div>

                      {/* **FOR HEADING AND TITLE** */}
                      <div>
                        <p className="px-2 lg:px-0 text-lg text-richblack-100">
                          {courseEntireData?.courseName}
                        </p>

                        <p className="text-richblack-25 px-2">
                          {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                      </div>
                    </div>

                    {/* ***FOR SECTION && SUB_SECTION*** */}
                     <div className="px-2">
                      {courseSectionData?.map((section) => (
                        <div
                          key={section?._id}
                          onClick={() => {
                            setActivestatus(section?._id)
                            }
                          }

                          className="flex flex-col gap-y-2"
                        >
                          {/* **SECTION*** */}
                          <div>
                            <p>{section?.sectionName}</p>

                            {/* add arraow icon and handel rotaion section opne & close  */}
                          </div>

                          {/* ** SUB_SECTION*** */}
                          <div>
                            {
                              //section id and currnt section id are tequal then oly show sub-section

                              activeStatus === section?._id && (
                                <div className="flex flex-col gap-y-3">
                                  {section?.subSection?.map((topic, index) => (
                                    <div
                                      onClick={() => {
                                        navigate(
                                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                        );
                                        setVideobaractive(topic?._id);
                                        setIsDrawerOpen(false)
                                      }}
                                      key={index}
                                      className={`flex gap-5 p-2 
                                  ${
                                    videobarActive === topic?._id
                                      ? "bg-yellow-200 text-richblack-800"
                                      : " bg-richblack-900 text-richblack-25"
                                  }
                                  `}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={completedLectures.includes(
                                          topic?._id
                                        )}
                                        onChange={() => {}}
                                      />

                                      <p>{topic?.title}</p>
                                    </div>
                                  ))}
                                </div>
                              )
                            }
                          </div>
                        </div>
                      ))}
                     </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div className="px-2">

               {/* **FOR BUTTONS */}
                <div className=" flex flex-col gap-4">     
                  <div>
                    <div
                      onClick={() => {
                        navigate("/dashboard/enrolled-courses");
                      }}
                      className="bg-richblack-700 px-4 py-2 flex items-center gap-2 rounded-md 
                    text-xl text-center text-richblack-50  cursor-pointer underline"
                    >
                    <AiOutlineArrowLeft/>  Back 
                    </div>

                    <div 
                     onClick={()=>setReviewModal(true)}
                     className="border-[1px] border-yellow-300 w-[80%] mx-auto p-2 cursor-pointer text-center"
                     >
                      Add review
                    </div>
                  </div>

                  {/* **FOR HEADING AND TITLE** */}
                   <div>
                    <p className="text-lg font-semibold">{courseEntireData?.courseName}</p>

                    <p className="text-lg">
                      {completedLectures?.length} / {totalNoOfLectures}
                    </p>
                  </div>
                </div>
                 {/* ***FOR SECTION && SUB_SECTION*** */}
                 <div className="flex flex-col gap-3 mt-3">
                  {courseSectionData?.map((section) => (
                    <div
                      key={section?._id}
                      onClick={() => setActivestatus(section?._id)}
                      className="flex flex-col gap-3"
                    >
                      {/* **SECTION*** */}
                      <div>
                        <p >{section?.sectionName}</p>

                        {/* add arraow icon and handel rotaion section opne & close  */}
                      </div>

                      {/* ** SUB_SECTION*** */}
                      <div>
                        {
                          //section id and currnt section id are tequal then oly show sub-section

                          activeStatus === section?._id && (
                            <div className="flex flex-col gap-3">
                              {section?.subSection?.map((topic, index) => (
                                <div
                                  onClick={() => {
                                    navigate(
                                      `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                    );
                                    setVideobaractive(topic?._id);
                                  }}
                                  key={index}
                                  className={`flex gap-5 p-2 rounded-md
                                  ${
                                    videobarActive === topic?._id
                                      ? "bg-yellow-200 text-richblack-800"
                                      : " bg-richblack-900 text-richblack-25"
                                  }
                                  `}
                                >
                                  <input
                                    type="checkbox"
                                    checked={completedLectures.includes(
                                      topic?._id
                                    )}
                                    onChange={() => {}}
                                  />

                                  <p>{topic?.title}</p>
                                </div>
                              ))}
                            </div>
                          )
                        }
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
