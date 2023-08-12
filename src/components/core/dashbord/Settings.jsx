import React, { useState } from "react";
import "./setting.css"
import { useDispatch, useSelector } from "react-redux";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  changeProfilePicture,
  changeProfileDetails,
  changePassword,
} from "../../../services/operations/profileAPI";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [passdata, setPassword] = useState({
    newpassword: "",
    oldpassword: "",
  });
  const navigate = useNavigate();

  const [profilePic, setprofilepic] = useState(null);
  const dispatch = useDispatch();

  const [showoldPass, setShowoldpass] = useState(false);
  const [shownewPass, setShownewpass] = useState(false);

  const { register, handleSubmit } = useForm();

  //set profile picture
  const setProfilepicture = (e) => {
    const file = e.target.files[0];
    setprofilepic(file);
  };

  //cahge profile picture function
  const updatePictureHandler = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("displayPicture", profilePic);

      dispatch(changeProfilePicture(token, formData));
    } catch (error) {
      console.log("ERROR", error.message);
    }
  };

  // change profile details ,/Name/Last name/Abou etc
  const changeProfileHandler = (data) => {
    dispatch(changeProfileDetails(token, data));
  };

  //change password
  function setPassdataHandler(e) {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const changePasswordHandler = (e) => {
    e.preventDefault();

    dispatch(changePassword(token, passdata));
  };

  return (
    <div className="w-[100%] mb-5">
      <div className="pt-6">
        <h1 className="text-2xl font-edu-sa font-bold ">Edit Profile</h1>

        {/* *SECTION 1 */}
        <form
          onSubmit={updatePictureHandler}
          className="bg-richblack-800  lg:w-[60%] flex gap-3 mt-4 rounded-md"
        >
          <img
            src={user?.image}
            alt="/profile_image"
            className="rounded-full my-4 mx-2 h-16 w-16"
          />

          <div className="flex flex-col gap-2 my-2 w-full">
            <p className="text-richblack-400">Change profile picture</p>

            <div className="flex gap-10 justify-between w-full items-center">
              {/* <div className="custom-file-input w-[50px]">
                <input type="file" 
                 accept="image/*"
                 id="fileInput" 
                 required 
                 className="file-input cursor-pointer" 
                 onChange={setProfilepicture}
                />
                <label  className="file-label">
                  Change
                </label>
              </div> */}

              <div className="custom-file-input w-[50px]">
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  required
                  className="file-input cursor-pointer visually-hidden"
                  onChange={setProfilepicture}
                />
                <label htmlFor="fileInput" className="file-label">
                  Change
                </label>
              </div>

              <button
                onClick={() => updatePictureHandler}
                className="bg-richblack-600 px-4 py-2  rounded-md mx-2"
              >
                UDPDATE
              </button>
            </div>
          </div>
        </form>

        {/* SECTION 2 */}
        <form onSubmit={handleSubmit(changeProfileHandler)}>
          <div
            className="bg-richblack-800 w-full lg:w-[60%] rounded-md mt-3
               text-richblack-500 flex flex-col gap-3"
          >
            <p className="ml-3 mt-2 text-richblack-50">Profile Information</p>
               
               {/* FOR FIRST NAME && LAST NAME */}
            <div className="lg:flex gap-2 w-full lg:ml-2 px-2 lg:px-0">
              <label className="lg:w-[48%] flex flex-col gap-2">
                <p className="text-richblack-50">First Name</p>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={user?.firstName}
                  {...register("firstName", { required: true })}
                  className="bg-richblack-600 px-2 py-2 border-none 
                           shadow-md rounded-md outline-none text-richblack-200"
                />
              </label>

              <label className="lg:w-[48%] flex flex-col gap-2">
                <p className="text-richblack-50">Last Name</p>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={user?.lastName}
                  {...register("lastName", { required: true })}
                  className="bg-richblack-600 px-2 py-2 border-none 
                           shadow-md rounded-md outline-none text-richblack-200"
                />
              </label>
            </div>

                {/* FOR DOB AND GENDER */}
            <div className="lg:flex gap-2 w-full lg:ml-2 px-2 lg:px-0">
              {/* *FOR DATE OF BIRTH */}
              <label className="w-full lg:w-[48%] flex flex-col gap-2">
                <p className="text-richblack-50">Date of birth</p>

                <input
                  type="date"
                  name="dateOfBirth"
                  className="bg-richblack-600 px-2 py-2 border-none 
                           shadow-md rounded-md outline-none text-richblack-200"
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Please enter your Date of Birth.",
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future.",
                    },
                  })}
                  defaultValue={user?.additonalDetails?.dateOfBirth}
                />
              </label>

              {/* **FOR GENDER */}
              <label className="lg:w-[48%] flex flex-col gap-2">
                <p className="text-richblack-50">Gender</p>
                <select
                  name="gender"
                  className="bg-richblack-600 px-2 py-2 border-none 
                           shadow-md rounded-md outline-none text-richblack-200"
                  defaultValue={user?.additonalDetails?.gender}
                  {...register("gender", { required: true })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <div className="lg:flex gap-2 w-full px-2 lg:px-0 lg:ml-2 mb-2">
              {/* ***CONTACT NUMBER */}
              <label className="lg:w-[48%] flex flex-col gap-2 ">
                <p className="text-richblack-50">Contact number</p>
                <input
                  name="contactNumber"
                  type="number"
                  className="bg-richblack-600 px-2 py-2 border-none 
                           shadow-md rounded-md outline-none text-richblack-200"
                  {...register("contactNumber", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Contact Number" },
                    minLength: { value: 10, message: "Invalid Contact Number" },
                  })}
                  defaultValue={user?.additonalDetails?.contactNumber}
                />
              </label>

              {/* ***ABOUT */}
              <label className="lg:w-[48%] flex flex-col gap-2">
                <p className="text-richblack-50"> About</p>
                <input
                  type="text"
                  name="about"
                  {...register("about", { required: true })}
                  defaultValue={user?.additonalDetails?.about}
                  className="bg-richblack-600 px-2 py-2 border-none 
                           shadow-md rounded-md outline-none text-richblack-200"
                />
              </label>
            </div>
          </div>
           
           {/* FORM BUTTON  */}
          <div className="lg:w-[60%] mt-3 ">
            <div className="flex justify-end gap-2">
              <button
                className="bg-yellow-100 rounded-md px-2 py-2 text-richblack-800 "
                type="submit"
              >
                Save
              </button>

              <button
                onClick={() => {
                  navigate("/dashboard/my-profile");
                }}
                className="bg-richblack-400 text-richblack-700 py-2 px-2 rounded-md"
              >
                Cancle
              </button>
            </div>
          </div>
        </form>

        {/* *SECTION 3 */}
        <div className="bg-richblack-800  lg:w-[60%] flex flex-col gap-3 mt-4 rounded-md">
          <p className="text-xl text-richblack-25 p-2">Password</p>

          <form className="w-full" onSubmit={changePasswordHandler}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 w-full lg:ml-3 px-4 lg:px-0">
              <label className="flex flex-col gap-2 lg:w-[48%]">
                <p className="text-richblack-50">Current Password</p>
                <div className="flex gap-1 items-center">
                  <input
                    type={!showoldPass ? "password" : "text"}
                    name="oldpassword"
                    value={passdata?.oldpassword}
                    onChange={setPassdataHandler}
                    required
                    className="bg-richblack-500 w-full text-richblack-25 rounded-md px-2 py-2 outline-none "
                  />
                  <div className="-ml-8 cursor-pointer">
                    {!showoldPass ? (
                      <AiFillEye
                        size={20}
                        onClick={() => setShowoldpass(!showoldPass)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        size={20}
                        onClick={() => setShowoldpass(!showoldPass)}
                      />
                    )}
                  </div>
                </div>
              </label>

              <label>
                <p>New Password</p>
                <div className="flex items-center">
                  <input
                    type={!shownewPass ? "password" : "text"}
                    name="newpassword"
                    value={passdata.newpassword}
                    onChange={setPassdataHandler}
                    required
                    className="bg-richblack-500 w-full text-richblack-25 px-2 py-2 rounded-md outline-none"
                  />
                  <div className="-ml-8 cursor-pointer">
                    {!shownewPass ? (
                      <AiFillEye
                        size={20}
                        onClick={() => setShownewpass(!shownewPass)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        size={20}
                        onClick={() => setShownewpass(!shownewPass)}
                      />
                    )}
                  </div>
                </div>
              </label>
            </div>

            <div className="flex justify-start ml-3 mt-3 gap-4 mb-5">
              <button
                className="bg-yellow-100 px-4 py-2 rounded-md"
                type="submit"
              >
                Update
              </button>
              <div className="bg-richblack-600 px-4 py-2 rounded-md">
                Cancle
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
