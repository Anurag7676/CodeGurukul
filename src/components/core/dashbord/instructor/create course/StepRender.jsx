import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import RenderCourseInfo from "./courseinfo/RenderCourseInfo";
import CourseBuilderForm from "./course_builder/CourseBuilderForm";
import CoursePublish from "./coursepublish";
import './steprender.css'

const StepRender = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Information",
    },
    {
      id: 2,
      title: "Builder",
    },

    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="text-richblack-25 w-full relative">

        <div className="w-fll sm:w-[90%] lg:w-[80%] flex justify-between mx-auto lg:ml-8 mt-10 ">
          {steps.map((item, index) => (
            <div key={item?.id} 
             className=" flex flex-col gap-1 Circle"
             >

              <div className="flex w-full items-center relative">
                <div
                  className={`w-12 h-12 rounded-full flex justify-center items-center 
                        ${
                          step === item.id
                            ? "bg-yellow-700 border-yellow-100 border-[1px] text-yellow-100"
                            : "bg-richblack-600 border-yellow-100 text-richblack-200 border-[1px]"
                        }`}
                >
                  {step > item.id ? <FaCheck /> : `${item.id}`}
                </div>

                <div className=" ">
                  {index !== 2 && step>1 &&(
                    <div className={`h-0.5 my-div sm:w-[280px] lg:w-[234px] 
                    ${step >item.id ?"border-yellow-100" :"border-b-richblack-600 "} 
                    border-[1px] border-dashed `}>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p>{item.title}</p>
              </div>

            </div>
          ))}
        </div>




        {step === 1 && <RenderCourseInfo />}
        {step ===2 && <CourseBuilderForm/>}
        {step ===3 && <CoursePublish/>}
      </div>
    </>
  );
};

export default StepRender;
