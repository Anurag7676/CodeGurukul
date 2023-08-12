import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeaturesAPIs";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPIs";
import { GiEarthAmerica } from "react-icons/gi";
import GetAvgRating from "../utils/avgRating";
import RatingStar from "../components/core/common/RatingStar";
import Footer from "../components/core/common/Footer";
import { RxDropdownMenu } from "react-icons/rx";
import { FiMonitor } from "react-icons/fi";
import { LuMousePointer } from "react-icons/lu";
import { GrCertificate } from "react-icons/gr";
import { FaShare } from "react-icons/fa";
import { addToCart } from "../Redux/slice/cartSlice";
import ConfirmationModal from "../components/core/common/ConfirmationModal";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import LernerReview from "../components/core/coursedetails/LernerReview";

const CoureseDetails = () => {
  const [lernerReview, setLernerreview] = useState([]);
  const [hasEnroll, setHasenroll] = useState(false);
  const [confirnationModal, setConfirmationmodal] = useState(null);
  const [Rating, setRating] = useState(0);
  const [totalVideoCount, setTotalVideocount] = useState(0);
  const [WhatYouLearn, setWhatYouLearn] = useState([]);
  const [CourseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //share course link
  const shareHandler = () => {
    copy(window.location.href);
    toast.success("Linked copyed in clipboard");
  };

  //check user already course buy or not
  const checkEnrollment = (user) => {
    let allEnroledCourses = user?.courses;
    for (const course_Id of allEnroledCourses) {
      if (courseId === course_Id) {
        return false;
      }
    }
    return true;
  };

  // Function to get the total video count from the courseContent
  function getTotalVideoCount(courseContent) {
    return courseContent?.reduce((total, section) => {
      // Count the videos in each subsection and add to the total
      return (
        total +
        section.subSection.filter((subsection) => subsection.videoUrl).length
      );
    }, 0);
  }

  useEffect(() => {
    if (!token) {
      
      setConfirmationmodal({
        text1: "You are not loged in",
        text2: "Please log in to purches the course & view course details",
        btn1Text: "Log in",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationmodal(null),
      });
    }
    
    else {
      async function getdetails_course() {
        setLoading(true);
        let res = await getFullDetailsOfCourse(courseId, token);

        if (res) {
          
          setCourseDetails(res?.courseDetails);

          //convert string to array for geberate whatyou learn array from string basis on "."
          let string = res?.courseDetails?.whatYouWillLearn;
          let arr = string ? string.split(".") : [];
          arr = await arr.map((s) => s.trim()).filter((s) => s !== "");

          setWhatYouLearn(arr);

          //set total video count using courseContent
          const totalVideoCount = getTotalVideoCount(
            res?.courseDetails?.courseContent
          );
          setTotalVideocount(totalVideoCount);

        

          //set raing
          const count = GetAvgRating(res?.courseDetails?.ratingAndReviews);

          //set lernerreview for lerner-review slider
          setLernerreview(res?.courseDetails?.ratingAndReviews);

          if (count) setRating(count);
        }
        if (user) {
          setHasenroll(checkEnrollment(user));
        }



        setLoading(false);
      }

      getdetails_course();

     
    }
  }, [courseId]);

 
  //handel buy course
  const handelByCourse = (e) => {
    e.preventDefault();

    if (user?.accountType === "Instructor") {
      toast.error("Instructor can't buy course");
      return;
    }
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch, "singleBuy");
    }
  };

  //add course into your cart
  const courseAddToCartHandler = (e) => {
    e.preventDefault();
    if (CourseDetails) {
      dispatch(addToCart(CourseDetails));
    }
  };

  //format video duration to HR : MIN : SEC
  function formatVideoDuration(durationInSeconds) {
    
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    // Add leading zeros if necessary
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toFixed(0).toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  if (loading) {
    return <div>Loading.......</div>;
  }
  return (
    <>
      <div className="relative w-screen h-screen ">
        {token ? (
          <>
            <div className="w-full lg:w-[85%] mx-auto px-2 lg:px-0">
              <p className="flex text-richblack-25 mt-6">
                {`Home / Learning / `}
                <span className="text-yellow-100">
                  {" "}
                  {CourseDetails?.category?.name}
                </span>
              </p>

              <div className="flex  flex-col-reverse lg:flex-row w-full">
                {/* **LEFT PART course content */}
                <div className="w-full lg:w-[75%] p-2 ">
                  <div className="w-full lg:w-[90%] mx-auto p-2 flex flex-col gap-y-3 lg:border-r-richblack-200 lg:border-r-[2px]">
                    <h1 className="text-richblack-5 font-semibold lg:text-2xl lg:mt-3">
                      {CourseDetails?.courseName}
                    </h1>
                    <p className="text-richblack-300">
                      {CourseDetails?.courseDescription}
                    </p>

                    <div className="lg:flex items-center gap-2 mt-3">

                      <div className="flex ">
                      <p className="text-yellow-100">{Rating}</p>
                      <RatingStar Review_Count={Rating} />
                      <p className="text-richblack-50">
                        {`( ${CourseDetails?.ratingAndReviews?.length} )`}
                      </p>
                      </div>
                      

                      

                      <p className="text-richblack-300 lg:ml-8">
                        Student in course:{" "}
                        <span className="text-richblack-5">
                          {CourseDetails?.studentsEnrolled?.length}
                        </span>{" "}
                      </p>
                    </div>
                    <p className="text-white">
                      Created by{" "}
                      <span className="text-yellow-100">
                        {CourseDetails?.instructor?.firstName}{" "}
                        {CourseDetails?.instructor?.lastName}
                      </span>
                    </p>

                    <div className="flex gap-5 items-center">
                      <span className="text-richblack-300">
                        Created at: 12.04.2023
                      </span>{" "}
                      <span className="text-richblack-50 font-bold flex gap-2 items-center">
                        <GiEarthAmerica size={25} /> English{" "}
                      </span>
                    </div>
                  </div>

                  {/* **WHAT you WIILL LEARN SECTION */}
                  <div className="w-full lg:w-[90%] mx-auto  lg:p-4 p-2 border-richblack-500 border-[1px] mt-5">
                    <p className="text-richblack-25 font-semibold text-xl">
                      What you'll learn
                    </p>
                    <ul className="flex flex-col gap-2 mt-3">
                      {WhatYouLearn?.map((item, index) => (
                        <li
                          key={index}
                          className="text-richblack-300 list-disc ml-2"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* **COURSE STUCTURE FOR DETILS OF COURSE  */}
                  <div className="mt-8 w-full lg:w-[90%] mx-auto ">
                    <h2 className="text-xl font-bold text-richblack-5">
                      Course Content
                    </h2>

                    <div className="flex gap-3 items-center mt-4">
                      <p className="text-richblack-50 font-semibold">
                        {CourseDetails?.courseContent?.length} Section
                      </p>

                      <p className="text-richblack-50 font font-semibold">
                        {totalVideoCount ? totalVideoCount : "0"} Lecture
                      </p>
                    </div>

                    {/* **COURSE DETAILS STRUCTURE && VIDOE */}
                    <div>
                      {CourseDetails?.courseContent &&
                        CourseDetails?.courseContent?.map((section) => (
                          <details key={section._id}>
                            <summary>
                              <div className="bg-richblack-500 text-richblack-50 p-2 flex items-center justify-between rounded-md">
                                <div className="flex gap-2 items-center">
                                  <RxDropdownMenu
                                    size={25}
                                    style={{ cursor: "pointer" }}
                                  />
                                  <p>{section?.sectionName}</p>
                                </div>

                                <p className="lg:ml-10 text-yellow-100">
                                  lecture {section?.subSection?.length}
                                </p>
                              </div>
                            </summary>

                            <div>
                              {section?.subSection?.map((item) => (
                                <div
                                  className="text-richblack-25"
                                  key={item._id}
                                >
                                  <details>
                                    <summary className="flex items-center justify-between gap-3 p-2 ml-3">
                                      <div className="flex gap-2 items-center">
                                        <RxDropdownMenu
                                          size={20}
                                          style={{ cursor: "pointer" }}
                                        />
                                        <p className="flex gap-2 items-center ml-3">
                                          <FiMonitor /> {item?.title}
                                        </p>
                                      </div>

                                      <p className="text-richblack-200 ">
                                        {formatVideoDuration(
                                          item?.timeDuration
                                        )}
                                      </p>
                                    </summary>

                                    <p className="ml-5 pl-2 text-richblack-400">
                                      {item?.description}
                                    </p>
                                  </details>
                                </div>
                              ))}
                            </div>
                          </details>
                        ))}
                    </div>
                  </div>
                </div>

                {/* **RIGHT PART FOR COURSE CARD BUY & ADD CART   */}
                 <div className="w-full lg:w-[25%] h-fit bg-richblack-600 mt-4 lg:mt-0">
                  <img
                    src={CourseDetails?.thumbnail}
                    alt={CourseDetails?.courseName}
                    loading="lazy"
                    className="rounded-md w-full object-cover"
                  />

                  <p className="text-xl text-richblack-50 pl-4 mt-4">
                    RS. {CourseDetails?.price} /-
                  </p>

                  {/* CART && BUY BUTTON */}
                  <div className="w-full ">
                    {hasEnroll ? (
                      <div className="w-full flex flex-col gap-5 my-4">
                        {/* ADD TO CART*** */}
                        <button
                          onClick={courseAddToCartHandler}
                          className="text-richblack-400 bg-richblack-900 outline-1 lg:w-[90%] mx-5 outline-richblack-25  px-6 py-2  rounded-md transition-all duration-200 hover:scale-95 hover:text-richblack-700"
                        >
                          Add to cart
                        </button>

                        {/* BUY COURSE */}
                        <button
                          className="px-6 py-2 lg:w-[90%] mx-5  rounded-md bg-yellow-100 text-richblack-700 font-semibold transition-all duration-200 hover:scale-95"
                          onClick={handelByCourse}
                        >
                          Buy Course
                        </button>
                      </div>
                    ) : (
                      <div className="w-full">
                        <button 
                        onClick={()=>{                        
                               user?.accountType !=="Instructor"  
                               ? navigate("/dashboard/enrolled-courses")
                               :
                               navigate("/dashboard/my-courses")                              
                               }
                        
                              }
  
                        className="px-6 py-2 lg:w-[90%] mx-5  rounded-md bg-yellow-100 text-richblack-700 font-semibold transition-all duration-200 hover:scale-95 my-4">
                          Go to course
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-richblack-300 text-center">
                    3o days money back gurantee
                  </p>
                  <div className="flex flex-col gap-3 pl-5 my-4">
                    <p className="flex items-center gap-2 text-richblack-100">
                      <LuMousePointer /> Full lifetime access
                    </p>

                    <p className="flex items-center gap-2 text-richblack-100">
                      <FiMonitor /> Access on Compter & mobile
                    </p>

                    <p className="flex items-center gap-2 text-richblack-100">
                      <GrCertificate style={{ color: "whitesmoke" }} />{" "}
                      Certificate on completion
                    </p>
                  </div>
                  <div
                    onClick={shareHandler}
                    className="text-yellow-100 text-center flex gap-2 my-2
               justify-center items-center cursor-pointer"
                  >
                    Share <FaShare />
                  </div>
                </div>
              </div>

              {/* AUTHOR DETIALS */}
              <div className="lg:w-[70%] lg:ml-12 mt-4">
                <p className="text-white font font-semibold text-xl tracking-wider ">
                  Author
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="lg:w-[70px] lg:h-[70px] rounded-full
                bg-richblack-700 flex justify-center items-center"
                  >
                    <img
                      className="w-[60px] h-[60px] rounded-full object-center shadow-lg"
                      src={CourseDetails?.instructor?.image}
                      alt={"CourseDetails?.instructor?.firstName"}
                    />
                  </div>

                  <p className="text-richblue-100 text-xl">
                    {CourseDetails?.instructor?.firstName}{" "}
                    {CourseDetails?.instructor?.lastName}
                  </p>
                </div>
                <p className="text-richblack-200 my-3">
                  I will be your lead trainer in this course. Within no time, I
                  will help you to understand the subject in an easy manner. I
                  have a huge experience in online training and recording
                  videos. Let's get started!
                </p>
              </div>

              {/* **REVIEW SLIDER */}
              <div className="my-10">
                <p className="text-richblack-25 font-semibold text-2xl text-center my-4">
                  Review from other lernres
                </p>
                {lernerReview?.length > 0 ? (
                  <LernerReview
                    reviews={lernerReview}
                    CourseName={CourseDetails?.courseName}
                  />
                ) : (
                  <p className="text-richblack-25 text-2xl font-semibold text-center">
                    No review found
                  </p>
                )}
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <>
            <div className="absolute  top-[40%] left-[50%] translate-x-[-50%] traslate-y-[-50%]">
              {confirnationModal && (
                <ConfirmationModal modalData={confirnationModal} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CoureseDetails;
