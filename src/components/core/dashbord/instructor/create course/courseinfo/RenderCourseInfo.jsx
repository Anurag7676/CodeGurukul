import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../../common/IconButton";
import { setStep, setCourse } from "../../../../../../Redux/slice/courseSlice";
import RequirementField from "./RequirementField";
import Upload from '../course_builder/Upload'
import {
  fetchCourseCatagory,
  createCourse,
  editCourseDetails
} from "../../../../../../services/operations/courseDetailsAPIs";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import { FiUpload } from "react-icons/fi";
import TagInput from "./TagInput";
import { toast } from "react-hot-toast";
import {TiDelete} from "react-icons/ti"


const RenderCourseInfo = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);

  const [catagories, setCatagories] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();



  //get course catagory
  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCatagory();
    if (categories.length > 0) {
      setCatagories(categories);
    }
    setLoading(false);
  };

  //cal api for category
  useEffect(() => {
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTag", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories();
  }, []);

  //this function check user is upadte their data or not******
  const isFormUpdated = () => {
    const currentValues = getValues();
    // if user want to update course to check if previous value not match
    //then only set new value , if user dosenot change anything it meaningless to set same value again
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTag.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    )
      return true;
    else return false;
  };

  // upolad all details of course
  const submitHandler = async (data) => {

    // ***this portion of code for when user edit the created course
    if (editCourse) {
      //if its true thats mean user edit someting not same previous data
      if (isFormUpdated()) {
        console.log("is edited printing");
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }

        if (currentValues.courseTag.toString() !== course.tag.toString()) {
          // formData.append("tag", JSON.stringify(data?.courseTag));
          formData.append("tag", JSON.stringify(data?.courseTag));
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("NO Changes made so far");
      }
    

      return;
    }

    //**THIS SECTION FOR 1ST TIME INSTRUCTOR CREATED THE COURSE */
    //create a new course
    const formData = new FormData();
    formData.append("courseName", data?.courseTitle);
    formData.append("courseDescription", data?.courseShortDesc);
    formData.append("price", data?.coursePrice);
    formData.append("whatYouWillLearn", data?.courseBenefits);
    formData.append("category", data?.courseCategory);
    formData.append("tag", JSON.stringify(data?.courseTag));
    formData.append("thumbnail", data.courseImage);
    formData.append("instructions", JSON.stringify(data?.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);

    //api call
    setLoading(true);

    const result = await createCourse(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <div className="bg-richblack-800 text-base mt-6 lg:w-[82%] rounded-md p-3 text-richblack-300">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-2"
      >
        {/* ***COURSE TITLE */}
        <label className="flex flex-col gap-1">
          <p className="text-richblack-300 ">
            Course title <sup>*</sup>
          </p>

          <input
            type="text"
            name="courseTitle"
            placeholder="Enter course title"
            {...register("courseTitle", { required: true })}
            className="px-2 py-2 rounded-md outline-none border-none bg-richblack-600 text-richblack-50"
          />
        </label>

        {/* **COURSE DISCRIPTION */}
        <div>
          <label className="flex flex-col gap-1">
            <p>
              Course short description <sup>*</sup>
            </p>
            <textarea
              cols="60"
              rows="5"
              {...register("courseShortDesc", { required: true })}
              className="px-2 py-2 rounded-md outline-none border-none bg-richblack-600 text-richblack-50"
            />
          </label>
        </div>

        {/* ** COURSE PRICE */}
        <div>
          <label className="flex flex-col gap-1">
            <p>
              Price <sup>*</sup>
            </p>
            <input
              type="number"
              {...register("coursePrice", { required: true })}
              className="px-2 py-2 rounded-md outline-none border-none bg-richblack-600 text-richblack-50"
            />
          </label>
        </div>

        {/* ** COURSE CATEGORY */}
        <div className="w-full over">
          <label className="flex flex-col gap-1">
            <p>
              Category <sup>*</sup>
            </p>

            <select
              defaultValue=""
              {...register("courseCategory", { required: true })}
              className="px-2 w-full py-2 rounded-md outline-none 
              border-none bg-richblack-600 text-richblack-50"
            >
              <option value="" disabled>
                Chpse a category
              </option>
              {!loading &&
                catagories.map((category, index) => (
                  <option
                    className="px-2 py-2 rounded-md overflow-hidden
                     outline-none border-none bg-richblack-600 text-richblack-50"
                    key={index}
                    value={category?._id}
                  >
                    {category?.name}
                  </option>
                ))}
            </select>
          </label>
        </div>

        {/* COUSRE TOPIC TAG <USING> CHIP */}
        <div>
          <TagInput
            name="courseTag"
            label="Add course tag"
            register={register}
            setValue={setValue}
            getValues={getValues}
            Style={
              "px-2 py-2 rounded-md outline-none border-none bg-richblack-600 text-richblack-50"
            }
          />
        </div>

       
        <div>
          <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
           errors={errors}
           editData={editCourse ? course?.thumbnail : null}
          />
        </div>

        <div>
          <label className="flex flex-col gap-1">
            <p>
              Benifit of course <sup>*</sup>
            </p>

            <textarea
              cols="60"
              rows="4"
              placeholder="Enter course benifits"
              {...register("courseBenefits", { required: true })}
              className="px-2 py-2 rounded-md outline-none border-none bg-richblack-600 text-richblack-50"
            />
          </label>
        </div>

        {/* REQUIREMENT FIELD */}
        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className="flex justify-between items-center">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className=" bg-richblack-600 
              sm:p-2 py-1 px-1 text-richblack-50 font-semibold rounded-md"
            >
              Continue Without Saving
            </button>
          )}

          <IconButton
            type="submit"
            text={!editCourse ? "Next" : "Save Changes"}
            customClasses={
              "sm:px-4 py-1 px-1 sm:py-2 bg-yellow-100 text-richblack-800 rounded-md"
            }
          />
        </div>
      </form>
    </div>
  );
};

export default RenderCourseInfo;
