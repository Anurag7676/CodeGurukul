import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import HighLightText from "../components/core/homepage/HighLightText";
import Button from "../components/core/homepage/Button";
import CodeBlock from "../components/core/homepage/CodeBlock";
import TimeLineSection from "../components/core/homepage/TimeLineSection";
import LearningLanguageSection from "../components/core/homepage/LearningLanguageSection";
import InstructorSection from "../components/core/homepage/InstructorSection";
import ExploreMore from "../components/core/homepage/ExploreMore";
import Footer from "../components/core/common/Footer";
import ReviewSlider from "../components/core/common/ReviewSlider";

import slide1 from "../assets/hero section/slide1a.gif";
import slide2 from "../assets/hero section/slide2a.gif";
import slide3 from "../assets/hero section/slide3.gif";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const HomePage = () => {
  const slideData = [
    {
      heading: "Coding Made Clear, Learning Without Fear!",
      content: slide1,
    },
    {
      heading: "Crack the Code of Success with Us!",
      content: slide2,
    },
    {
      heading: "Empowering Dreams Through Code and Learning!",
      content: slide3,
    },
  ];

  return (
    <>
      {/* **section 1 */}
      <div className="relative max-w-maxContent flex flex-col items-center justify-between mx-auto w-11/12 text-white "> 
        <Link to="/signup" className="w-[100%]  mx-auto">
          <div
            className=" w-fit font-bold bg-richblack-800 
            shadow-[inset 0px -1px 0px rgba(255, 255, 255, 0.18)] mt-16 p-1 group rounded-full 
              transition-all duration-300 hover:scale-95 mx-auto"
          >
            <div
              className="mx-auto flex gap-2 items-center rounded-full px-10 
               py-[5px] transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Became an Instructor</p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </Link>

        <div className="w-full">
          <p className="mx-auto font-inter text-xl lg:w-fit lg:text-center font-semibold mt-7">
            Empower your Future with <HighLightText text={"Coading Skills"} />
          </p>
          <p className="mt-4 lg:text-center text-base text-bold text-richblack-300 lg:w-[70%] mx-auto">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
        </div>

        <div className="flex gap-7 mt-8 mx-auto">
          <Button children={"Learn more"} active={true} linkto={"/signup"} />
          <Button children={"Book a demo"} active={false} linkto={"/signup"} />
        </div>


          
            
        <div className="w-full my-14 mx-3 flex justify-center shadow-[0px_10px_20px_6px_#2c7a7b]
         items-center text-xs sm:font-edu-sa py-3 rounded-md">
           
           <Swiper
             spaceBetween={30}
             centeredSlides={true}
             autoplay={{
             delay: 5500,
            disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mx-auto w-[80%]"
           >
          <SwiperSlide
         
          >

          <figure className="relative ">
              <img src={slide1} alt=""
               className="w-full lg:w-[95%] mx-auto lg:h-[600px] object-center rounded-md "
             />
            <figcaption className="absolute z-50 top-2 lg:top-5 left-2 lg:left-10 
             text-richblue-100 lg:text-lg font-semibold">
              {`" Code Beyond Boundaries: Crafting Tomorrow's Digital Realities! "`}
            </figcaption>
          </figure>
           
          </SwiperSlide>
          
      
          <SwiperSlide>
          <figure className="relative">
            <img src={slide2} alt="" 
              className="w-full lg:w-[95%] mx-auto lg:h-[600px] rounded-md"
            />
            <figcaption className="absolute z-50 top-2 lg:top-5 left-2 lg:left-10  text-richblue-100
             lg:text-lg font-semibold" >
              {`" Ctrl + Alt + Achieve: Cracking the Code to Your Limitless Future! "`}
            </figcaption>
          </figure>
            
          </SwiperSlide>

           </Swiper>
       </div>


        {/* code-block-1 */}
        <div className="w-full ">
          <CodeBlock
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-bold">
                Unoack your
                <HighLightText text={"Coading Potential"} />
                with our Online course
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            btn1={{
              text: (
                <p className="flex gap-2 items-center">
                  try it yourself <AiOutlineArrowRight />
                </p>
              ),
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              text: "Learn more",
              linkto: "/login",
              active: false,
            }}
            codechunk={`<!DOCTYPE html> \n <html> \n <head><title>Example</title><linkrel="stylesheet"href="styles.css"> \n </head> \n <body> \n <h1> <ahref="/">Header</a> \n </h1> \n <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a> \n </nav>`}
            codeColor={"text-yellow-25"}
            bdr={true}
          />
        </div>

        {/* code-block-2 */}
        <div>
          <CodeBlock
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-bold">
                <span className="ml-2">Start</span>
                <br />
                <HighLightText text={"Coading in Second"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            btn1={{
              text: (
                <p className="flex gap-2 items-center">
                  Continue lesson <AiOutlineArrowRight />
                </p>
              ),
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              text: "Learn more",
              linkto: "/login",
              active: false,
            }}
            codechunk={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-25"}
            bdr={false}
          />
        </div>
        <ExploreMore />
      </div>

      {/*  **Section-2 */}
      <div className="bg-[#F9F9F9] text-richblack-700">
        <div className="h-[220px] bg_home">
          <div className="w-11/12 text-white ">
            <div className="flex gap-5 items-center pt-16 lg:pt-32 w-fit mx-auto">
              <Button
                children={
                  <p className="flex gap-2 items-center">
                    Explore full catalog
                    <AiOutlineArrowRight />
                  </p>
                }
                active={true}
                linkto={"/signup"}
              />
              <Button
                children={"Learn more"}
                active={false}
                linkto={"/login"}
              />
            </div>
          </div>
        </div>

        <div className="lg:w-11/12 max-w-maxContent mt-8 mx-auto">
          <div className="w-full flex flex-col lg:flex-row items-center lg:justify-between gap-7">
            <div className="lg:w-[50%] px-1 my-3 text-richblack-600">
              <p className="text-4xl font-semibold">
                Get the skill you need for
                <HighLightText
                  text={"A job that is in demand"}
                  color={"text-blue-50"}
                />
              </p>
            </div>

            <div className="flex my-3 flex-col gap-3 lg:w-[50%] px-1">
              <p>
                The modern Code Gurukul is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills
              </p>
              <Button
                children={"Leran more"}
                active={"true"}
                linkto={"/signup"}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <TimeLineSection />
            <LearningLanguageSection />
          </div>
        </div>
      </div>

      {/* **section 3 */}
      <div className="w-11/12 mx-auto flex flex-col gap-4 mt-10">
        <InstructorSection />
      </div>

      {/* REVIEW SLIDER */}
      <div className="w-full px-3 my-5 lg:my-12">
        <p className="lg:text-4xl text-2xl text-richblack-5 text-center my-5 lg:my-7 font-bold font-inter">
          Revies from other lerners
        </p>
        <ReviewSlider />
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
