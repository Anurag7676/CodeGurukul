import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCatalogaPageData } from "../services/operations/pageAndcomponentData";
import { fetchCourseCatagory } from "../services/operations/courseDetailsAPIs";
import Footer from "../components/core/common/Footer";
import CourseCard from "../components/core/catalog/CourseCard";
import CourseSlider from "../components/core/catalog/CourseSlider";
import "./catalogpage.css";

const CatalogPgae = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);

  //to set catagoryID
  useEffect(() => {
    const getCategoriesID = async () => {
      setLoading(true);
      const res = await fetchCourseCatagory();
      const category_id = res?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);

      setLoading(false);
    };
    getCategoriesID();
  }, [catalogName]);

  // set for categoryPageDetails
  useEffect(() => {
    const getcategoryDetails = async () => {
      setLoading(true);
      try {
        let res = await getCatalogaPageData(categoryId);
        // console.log("PRinting res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (categoryId) {
      getcategoryDetails();
    }
  }, [categoryId]);

  let selectedCourseDetails;
  if (catalogPageData) {
    selectedCourseDetails = catalogPageData.selectedCourses[0];
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="custom-loader "></div>
        </div>
      ) : (
        <div className="text-richblack-50 w-full ">
          <div className="w-full lg:w-[90%] mx-auto">
            {/* HEARDER */}
            <div className="mt-10 ">
              <p className="my-2">
                {`Home / catalog / `}{" "}
                <span className="text-yellow-100">{catalogName}</span>
              </p>
              <p className="text-2xl font-semibold text-richblack-5">
                {selectedCourseDetails?.courseName}
              </p>
              <p className="my-1 lg:mb-4 w-full lg:w-[70%] text-sm text-richblack-300 px-2">
                {selectedCourseDetails?.courseDescription}
              </p>
            </div>

            {/* ***SECTION 1   */}
            <div className="mt-8 px-2 ">
              <p className="text-xl font-bold font-inter text-richblack-5">
                Course to you get started
              </p>
              <div className="flex gap-5 mt-2">
                <p className="text-yellow-100">Most Populer</p>
                <p className="text-richblack-200">New</p>
              </div>

              <div className="w-full sm:w-[70%]  mx-auto lg:w-full">
                <CourseSlider
                  dealy={1500}
                  courses={catalogPageData?.selectedCourses}
                 />  
              </div>
            
            </div>

            {/* ** SECTION _2 ** */}
            <div className="my-3 px-2">
              <div>
                <div>
                  <p className="text-richblack-5 text-xl  font-semibold">
                    {" "}
                    Top Course 
                  </p>
                </div>

                <div className="w-full sm:w-[70%]  mx-auto lg:w-full">
                <CourseSlider
                  dealy={2000}
                  courses={catalogPageData?.differentCourses}
                />
                </div>
                
              </div>
            </div>

            {/* *** SECTION-3 *** */}
            <div className="my-6 px-2 sm:px-4 lg:px-2 ">
              <div>
                <p className="text-richblack-5 text-xl font-semibold">
                  Frequently Bought
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 w-full sm:w-[80%] lg:w-[90%] mx-auto">
                  {catalogPageData?.mostSellingCourses
                    .slice(0, 4)
                    .map((course) => (
                      <CourseCard
                        key={course._id}
                        course={course}
                        ratingArray={course?.ratingAndReviews}
                        Height={"300px"}
                        screen='lg'
                        customStyle={"lg:h-[350px] p-2 "}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default CatalogPgae;
